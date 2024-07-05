/* eslint-disable react/prop-types */
import { SprintCreate } from "@/components/SprintDialog/SprintCreate";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import { DroppableTable } from "@/components/SprintTable/DroppableTable";

const initialTasks = [
    {
        id: "1",
        name: "Task 1",
        assignee: "Yessine Miled",
        dueDate: "Jun 20",
        status: "To Do",
        sprintId: "1",
    },
    {
        id: "2",
        name: "Task 2",
        assignee: "Yessine Miled",
        dueDate: "Jun 21",
        status: "In Progress",
        sprintId: "1",
    },
    {
        id: "3",
        name: "Task 3",
        assignee: "Yessine Miled",
        dueDate: "Jun 22",
        status: "Done",
        sprintId: "2",
    },
];

const initialTables = [
    {
        id: "1",
        title: "Sprint 1",
        description: "Sprint 1 Description",
        tasks: initialTasks,
    },
    {
        id: "2",
        title: "Sprint 2",
        description: "Sprint 2 Description",
        tasks: initialTasks,
    },
];

function Project() {
    const [open, setOpen] = useState(false);
    const [tables, setTables] = useState(initialTables);
    const [tasks, setTasks] = useState(initialTasks);
    const [activeId, setActiveId] = useState(null);
    const [overTableId, setOverTableId] = useState(null);

    const handleOpenCreateDialog = async () => {
        setOpen(true);
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragOver = (event) => {
        const { over } = event;
        if (over && initialTables.some((table) => table.id === over.id)) {
            setOverTableId(over.id);
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && initialTables.some((table) => table.id === over.id)) {
            const newSprintId = over.id;

            const updatedTasks = tasks.map((task) =>
                task.id === active.id
                    ? { ...task, sprintId: newSprintId }
                    : task
            );

            setTasks(updatedTasks);
            setTables((prevTables) =>
                prevTables.map((table) => ({
                    ...table,
                    tasks: updatedTasks.filter(
                        (task) => task.sprintId === table.id
                    ),
                }))
            );
        }

        setActiveId(null);
        setOverTableId(null);
    };

    function renderTaskDetails(tasks, activeId) {
        const task = tasks.find((task) => task.id === activeId);
        if (!task) return null;

        return (
            <TableRow>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.status}</TableCell>
            </TableRow>
        );
    }

    return (
        <div className="min-h-screen md:m-6 m-2">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold tracking-tight">
                    Projects / Project Name{"  "}
                    <Badge className="gap-0.5">
                        <Crown size={13} />
                        Yessine
                    </Badge>
                </h3>

                <Button variant="outline" onClick={handleOpenCreateDialog}>
                    Create a new sprint
                </Button>
            </div>
            <br />
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
                                    (task) => task.sprintId === table.id
                                ) || []
                            }
                            isOver={overTableId === table.id}
                        />
                    ))}
                    <DragOverlay>
                        {activeId ? (
                            <div className="border border-gray-300 shadow-md rounded-md">
                                {renderTaskDetails(tasks, activeId)}
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
            {open && <SprintCreate open={open} setOpen={setOpen} />}
        </div>
    );
}

export default Project;
