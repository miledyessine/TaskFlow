import { useEffect, useMemo, useState } from "react";
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";
import { createPortal } from "react-dom";
import { Button } from "../ui/button";
import { TicketPlus } from "lucide-react";
import { TaskCreate } from "../TaskDialog/TaskCreate";
import { Link, useParams } from "react-router-dom";
import { useAxios } from "@/hooks/axioshook";
import { Skeleton } from "../ui/skeleton";
import { CardDescription } from "../ui/card";

export function SprintBoard() {
    const { sprint_id } = useParams();
    const [columns, setColumns] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [activeColumn, setActiveColumn] = useState(null);

    const [activeTask, setActiveTask] = useState(null);
    const [open, setOpen] = useState(false);
    const [statusCol, setStatusCol] = useState(false);

    const [project, setProject] = useState();
    const projectFetcher = useAxios();
    const sprintFetcher = useAxios();
    const tasksFetcher = useAxios();
    const TaskTransfer = useAxios();
    const TaskDelete = useAxios();
    const [sprint, setSprint] = useState();
    const fetchData = () => {
        sprintFetcher
            .customFetchData({
                method: "GET",
                url: `/sprints/${sprint_id}`,
            })
            .then((sprintResult) => {
                setSprint(sprintResult.data);
                projectFetcher
                    .customFetchData({
                        method: "GET",
                        url: `/projects/${sprintResult.data.project_id}`,
                    })
                    .then((projectResult) => {
                        setProject(projectResult.data);
                        return projectResult.data;
                    })
                    .then((workflowResult) => {
                        setColumns(workflowResult.workflow);
                        console.log("herre", workflowResult.workflow);
                    })
                    .catch((error) => {
                        console.error("Error fetching project data:", error);
                    });
            })
            .catch((error) => {
                console.error("Error fetching sprint data:", error);
            });

        tasksFetcher
            .customFetchData({
                method: "GET",
                url: `/tasks?sprint_id=${sprint_id}`,
            })
            .then((tasksResult) => {
                setTasks(tasksResult.data);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);
    const columnsIds = useMemo(() => {
        return columns.map((col) => col);
    }, [columns]);
    const handleOpenCreateDialog = async () => {
        setOpen(true);
    };
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    return (
        <div className="md:m-6 m-2">
            {sprintFetcher.fetchHandler.loading && (
                <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-[250px]" />
                    <Skeleton className="h-6 w-[150px]" />
                </div>
            )}
            {sprint && (
                <div className="flex items-center justify-between">
                    <div className="flex-col items-end">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="text-2xl font-semibold tracking-tight">
                                {project && (
                                    <Link to={`/project/${project._id}`}>
                                        {project.name}/
                                    </Link>
                                )}{" "}
                                {sprint.name}
                            </h3>
                            {sprint.start_date && (
                                <CardDescription>
                                    {new Date(
                                        sprint.start_date
                                    ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                    })}{" "}
                                    -{" "}
                                    {new Date(
                                        sprint.end_date
                                    ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                    })}
                                </CardDescription>
                            )}
                            <CardDescription className="text-xs text-gray-400">
                                ({tasks ? tasks.length : "0"} tickets)
                            </CardDescription>{" "}
                        </div>
                        <p className="text-base text-gray-500 dark:text-gray-400">
                            {sprint.description}
                        </p>
                    </div>

                    <Button variant="outline" onClick={handleOpenCreateDialog}>
                        <TicketPlus className="h-4 w-4 mr-1" />
                        <span className="sr-only sm:not-sr-only">Add Task</span>
                    </Button>
                </div>
            )}
            <br />
            <div>
                {columns?.length > 0 && tasks?.length > 0 && (
                    <DndContext
                        sensors={sensors}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        onDragOver={onDragOver}
                    >
                        <div className="flex flex-row justify-around gap-4">
                            <SortableContext items={columnsIds}>
                                {columns?.length > 0 &&
                                    tasks?.length > 0 &&
                                    columns.map((col) => (
                                        <ColumnContainer
                                            key={col}
                                            column={col}
                                            projectId={project._id}
                                            createTask={createTask}
                                            deleteTask={deleteTask}
                                            updateTask={updateTask}
                                            tasks={tasks.filter(
                                                (task) => task.status === col
                                            )}
                                        />
                                    ))}
                            </SortableContext>
                        </div>
                        {createPortal(
                            <DragOverlay>
                                {activeColumn && (
                                    <ColumnContainer
                                        column={activeColumn}
                                        createTask={createTask}
                                        deleteTask={deleteTask}
                                        updateTask={updateTask}
                                        tasks={tasks.filter(
                                            (task) =>
                                                task.status === activeColumn._id
                                        )}
                                    />
                                )}
                                {activeTask && (
                                    <TaskCard
                                        projectId={project._id}
                                        task={activeTask}
                                        deleteTask={deleteTask}
                                        updateTask={updateTask}
                                    />
                                )}
                            </DragOverlay>,
                            document.body
                        )}
                    </DndContext>
                )}
            </div>
            {open && (
                <TaskCreate
                    sprint_id={sprint._id}
                    open={open}
                    setOpen={setOpen}
                    idType="sprint_id"
                    projectId={project._id}
                    statusCol={statusCol}
                />
            )}
        </div>
    );

    function createTask(status) {
        setStatusCol(status);
        setOpen(true);
    }

    function deleteTask(id) {
        const newAxiosParams = {
            method: "DELETE",
            url: `/tasks/${id}`,
        };
        TaskDelete.customFetchData(newAxiosParams).then((data) =>
            console.log(data)
        );
        console.log("delete");
        const newTasks = tasks.filter((task) => task._id !== id);
        setTasks(newTasks);
    }

    function updateTask(id, content) {
        const newTasks = tasks.map((task) => {
            if (task._id !== id) return task;
            return { ...task, content };
        });

        setTasks(newTasks);
    }


    

    function onDragStart(event) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;
        console.log("object", overId);
        if (activeId === overId) return;

        const newAxiosParams = {
            method: "PATCH",
            url: `/tasks/${activeId}`,
            data: {
                status: overId,
            },
        };
        TaskTransfer.customFetchData(newAxiosParams).then((data) =>
            console.log(data)
        );
    }

    function onDragOver(event) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if (!isActiveATask) return;

        // Im dropping a Task over another Task
        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t._id === activeId);
                const overIndex = tasks.findIndex((t) => t._id === overId);

                if (tasks[activeIndex].status !== tasks[overIndex].status) {
                    // Fix introduced after video recording
                    tasks[activeIndex].status = tasks[overIndex].status;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === "Column";

        // Im dropping a Task over a column
        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t._id === activeId);

                tasks[activeIndex].status = overId;
                console.log("DROPPING TASK OVER COLUMN", { activeIndex });
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }
}
