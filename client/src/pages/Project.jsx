/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { SprintCreate } from "@/components/SprintDialog/SprintCreate";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    MouseSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import { DroppableTable } from "@/components/SprintTable/DroppableTable";
import { useParams } from "react-router-dom";
import { useAxios } from "@/hooks/axioshook";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

function Project() {
    const { project_id } = useParams();
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState();
    const [user, setUser] = useState();
    const [tables, setTables] = useState();
    const [tasks, setTasks] = useState();
    const [activeId, setActiveId] = useState(null);
    const [overTableId, setOverTableId] = useState(null);

    const projectData = useAxios({
        method: "GET",
        url: `/projects/${project_id}`,
    });
    const backlogs = useAxios({
        method: "GET",
        url: `/backlogs?project_id=${project_id}`,
    });
    const sprints = useAxios({
        method: "GET",
        url: `/sprints?project_id=${project_id}`,
    });
    // important change it to tasks?project_id=${project_id}
    const tasksData = useAxios({
        method: "GET",
        url: "/tasks",
    });

    console.log(tasks);
    console.log(tables);

    const handleOpenCreateDialog = async () => {
        setOpen(true);
    };
    useEffect(() => {
        if (backlogs.response && sprints.response) {
            setTables([...sprints.response, ...backlogs.response]);
        }
        if (tasksData.response) {
            setTasks([tasksData.response][0]);
        }
        if (projectData.response) {
            setProject(projectData.response);
            axios
                .get(`/users/${projectData.response.createdBy}`)
                .then((userResponse) => {
                    setUser(userResponse.data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [
        backlogs.response,
        sprints.response,
        tasksData.response,
        projectData.response,
    ]);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                delay: 250,
                distance: 10,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

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

    const handleDragEnd = (event) => {
        const { active, over } = event;
        console.log("active", active);
        console.log("over", over);
        if (active && tables.some((table) => table._id === over.id)) {
            const newSprintId = over.id;

            const updatedTasks = tasks.map((task) =>
                task._id === active.id
                    ? { ...task, sprint_id: newSprintId }
                    : task
            );

            setTasks(updatedTasks);
            setTables((prevTables) =>
                prevTables.map((table) => ({
                    ...table,
                    tasks: updatedTasks.filter(
                        (task) =>
                            task.sprint_id === table.id ||
                            task.backlog_id === table.id
                    ),
                }))
            );
        }

        setActiveId(null);
        setOverTableId(null);
    };

    function renderTaskDetails(tasks, activeId) {
        const task = tasks.find((task) => task._id === activeId);
        if (!task) return null;

        return (
            <TableRow>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>
                    {new Date(task.due_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                    })}
                </TableCell>
                <TableCell>{task.status}</TableCell>
            </TableRow>
        );
    }

    return (
        <div className="md:m-6 m-2">
            {projectData.loading && (
                <div className="flex items-center justify-between">
                    <Skeleton className="h-10 w-[160px]" />
                    <Skeleton className="h-10 w-[160px]" />
                </div>
            )}
            {project && (
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold tracking-tight ">
                        {project.name}
                        {"  "}
                        <Badge className="gap-0.5">
                            <Crown size={13} />
                            {user?.username || (
                                <Skeleton className="h-5 w-[80px]" />
                            )}
                        </Badge>
                    </h3>

                    <Button variant="outline" onClick={handleOpenCreateDialog}>
                        Create a new sprint
                    </Button>
                </div>
            )}
            <br />
            {tables && tasks && (
                <div className="space-y-4">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                    >
                        {tables.map((table) => (
                            <DroppableTable
                                key={table.id}
                                table={table}
                                tasks={
                                    tasks.filter(
                                        (task) =>
                                            task.sprint_id === table._id ||
                                            task.backlog_id === table._id
                                    ) || []
                                }
                                isOver={overTableId === table._id}
                            />
                        ))}
                        <DragOverlay>
                            {activeId ? (
                                <Table>
                                    <TableBody>
                                        {renderTaskDetails(tasks, activeId)}
                                    </TableBody>
                                </Table>
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            )}
            {open && <SprintCreate open={open} setOpen={setOpen} />}
        </div>
    );
}

export default Project;
