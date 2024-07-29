import { useParams } from "react-router-dom";
import { useAxios } from "./axioshook";
import { useEffect, useState } from "react";
import axios from "axios";

export default () => {
    const { project_id } = useParams();
    const [openCreateSprint, setOpenCreateSprint] = useState(false);
    const [openCreateBacklog, setOpenCreateBacklog] = useState(false);
    const [project, setProject] = useState();
    const [user, setUser] = useState();
    const [tables, setTables] = useState();
    const [tasks, setTasks] = useState();
    const [activeId, setActiveId] = useState(null);
    const [overTableId, setOverTableId] = useState(null);

    const projectFetcher = useAxios();
    const tasksFetcher = useAxios();
    const backlogsFetcher = useAxios();
    const sprintsFetcher = useAxios();

    const handleOpenCreateSprintDialog = async () => {
        setOpenCreateSprint(true);
    };
    const handleOpenCreateBacklogDialog = async () => {
        setOpenCreateBacklog(true);
    };

    const fetchData = () => {
        projectFetcher
            .customFetchData({
                method: "GET",
                url: `/projects/${project_id}`,
            })
            .then((projectResult) => {
                setProject(projectResult.data);
                return axios.get(`/users/${projectResult.data.createdBy}`);
            })
            .then((userResponse) => {
                setUser(userResponse.data);
            })
            .catch((error) => {
                console.error("Error fetching project or user data:", error);
            });

        tasksFetcher
            .customFetchData({
                method: "GET",
                url: `/tasks`,
            })
            .then((tasksResult) => {
                if (tasksResult.data && tasksResult.data.length > 0) {
                    setTasks(tasksResult.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });

        backlogsFetcher
            .customFetchData({
                method: "GET",
                url: `/backlogs?project_id=${project_id}`,
            })
            .then((backlogsResult) => {
                sprintsFetcher
                    .customFetchData({
                        method: "GET",
                        url: `/sprints?project_id=${project_id}`,
                    })
                    .then((sprintsResult) => {
                        if (backlogsResult.data && sprintsResult.data) {
                            setTables([
                                ...sprintsResult.data,
                                ...backlogsResult.data,
                            ]);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching sprints:", error);
                    });
            })
            .catch((error) => {
                console.error("Error fetching backlogs:", error);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragOver = (event) => {
        const { over } = event;
        console.log("Table Over:", over);
        if (over && tables.some((table) => table._id === over.id)) {
            setOverTableId(over.id);
        }
    };
    const TaskTransfer = useAxios();
    const handleDragEnd = (event) => {
        const { active, over } = event;
        console.log("active", active);
        console.log("over", over);
        const overTable = tables.filter((table) => table._id === over.id)[0];
        const activeTask = tasks.find((task) => task._id === active.id);
        console.log("first", tables);
        console.log("table ov", overTable);
        console.log("task ov", activeTask);
        const isSprint = !!overTable.start_date;
        console.log(isSprint);
        if (active && tables.some((table) => table._id === over.id)) {
            const newTableId = over.id;
            if (isSprint) {
                const updatedTasks = tasks.map((task) =>
                    task._id === active.id
                        ? { ...task, sprint_id: newTableId }
                        : task
                );

                const newAxiosParams = {
                    method: "POST",
                    url: "/tasks/transfer-to-sprint",
                    data: { task_id: activeTask._id, sprint_id: overTable._id },
                };
                TaskTransfer.customFetchData(newAxiosParams).then((data) =>
                    console.log(data)
                );

                setTasks(updatedTasks);
                setTables((prevTables) =>
                    prevTables.map((table) => ({
                        ...table,
                        tasks: updatedTasks.filter(
                            (task) =>
                                task.sprint_id === table._id ||
                                task.backlog_id === table._id
                        ),
                    }))
                );
            } else {
                const updatedTasks = tasks.map((task) =>
                    task._id === active.id
                        ? { ...task, backlog_id: newTableId }
                        : task
                );

                const newAxiosParams = {
                    method: "POST",
                    url: "/tasks/transfer-to-backlog",
                    data: {
                        task_id: activeTask._id,
                        backlog_id: overTable._id,
                    },
                };
                TaskTransfer.customFetchData(newAxiosParams).then((data) =>
                    console.log(data)
                );

                setTasks(updatedTasks);
                setTables((prevTables) =>
                    prevTables.map((table) => ({
                        ...table,
                        tasks: updatedTasks.filter(
                            (task) =>
                                task.backlog_id === table._id ||
                                task.sprint_id === table._id
                        ),
                    }))
                );
            }
        }

        setActiveId(null);
        setOverTableId(null);
    };
    return {
        handleDragEnd,
        handleDragOver,
        handleDragStart,
        handleOpenCreateSprintDialog,
        handleOpenCreateBacklogDialog,
        projectFetcher,
        openCreateSprint,
        setOpenCreateSprint,
        openCreateBacklog,
        setOpenCreateBacklog,
        project,
        user,
        tables,
        tasks,
        activeId,
        overTableId,
    };
};
