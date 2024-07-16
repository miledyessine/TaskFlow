import { useMemo, useState } from "react";
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
import { Link } from "react-router-dom";

const defaultCols = [
    {
        id: "todo",
        title: "Todo",
    },
    {
        id: "doing",
        title: "Work in progress",
    },
    {
        id: "done",
        title: "Done",
    },
    {
        id: "test",
        title: "Test",
    },
    {
        id: "test1",
        title: "Test1",
    },
];

const defaultTasks = [
    {
        id: "1",
        columnId: "todo",
        name: "Implement authentication",
        description: "Implement user authentication using JWT",
        status: "To Do",
        priority: 1,
    },
    {
        id: "2",
        columnId: "todo",
        name: "Set up database",
        description: "Set up PostgreSQL database with initial schema",
        status: "To Do",
        priority: 2,
    },
    {
        id: "3",
        columnId: "doing",
        name: "Create user interface",
        description:
            "Design and implement the user interface for the application",
        status: "In Progress",
        priority: 3,
    },
    {
        id: "4",
        columnId: "doing",
        name: "Configure CI/CD",
        description: "Set up continuous integration and deployment pipeline",
        status: "In Progress",
        priority: 2,
    },
    {
        id: "5",
        columnId: "done",
        name: "Develop API endpoints",
        description: "Create and test all necessary API endpoints",
        status: "Done",
        priority: 1,
    },
    {
        id: "6",
        columnId: "done",
        name: "Write documentation",
        description: "Document all features and APIs",
        status: "Done",
        priority: 3,
    },
    {
        id: "7",
        columnId: "todo",
        name: "Implement unit tests",
        description: "Write unit tests for all modules",
        status: "To Do",
        priority: 1,
    },
    {
        id: "8",
        columnId: "todo",
        name: "Optimize performance",
        description: "Optimize the application for better performance",
        status: "To Do",
        priority: 2,
    },
    {
        id: "9",
        columnId: "todo",
        name: "Set up logging",
        description: "Implement logging for all major actions",
        status: "To Do",
        priority: 3,
    },
    {
        id: "10",
        columnId: "todo",
        name: "Create user roles",
        description: "Define and implement user roles and permissions",
        status: "To Do",
        priority: 1,
    },
    {
        id: "11",
        columnId: "todo",
        name: "Integrate third-party services",
        description:
            "Integrate third-party services like email and payment gateways",
        status: "To Do",
        priority: 2,
    },
    {
        id: "12",
        columnId: "doing",
        name: "Code review",
        description: "Review and refactor existing code",
        status: "In Progress",
        priority: 3,
    },
    {
        id: "13",
        columnId: "doing",
        name: "Security audit",
        description: "Conduct a comprehensive security audit",
        status: "In Progress",
        priority: 1,
    },
];

export function SprintBoard() {
    const [columns, setColumns] = useState(defaultCols);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const [tasks, setTasks] = useState(defaultTasks);

    const [activeColumn, setActiveColumn] = useState(null);

    const [activeTask, setActiveTask] = useState(null);
    const [open, setOpen] = useState(false);
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
            <div className="flex items-center justify-between">
                
                    <h3 className="text-2xl font-semibold tracking-tight">
                        Sprint Name
                    </h3>
                
                <Button variant="outline" onClick={handleOpenCreateDialog}>
                    <TicketPlus className="h-4 w-4 mr-1" />
                    <span className="sr-only sm:not-sr-only">Add Task</span>
                </Button>
                {open && <TaskCreate open={open} setOpen={setOpen} />}
            </div>
            <br />
            <div>
                <DndContext
                    sensors={sensors}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                >
                    <div className="flex flex-row justify-around gap-4">
                        <SortableContext items={columnsId}>
                            {columns.map((col) => (
                                <ColumnContainer
                                    key={col.id}
                                    column={col}
                                    deleteColumn={deleteColumn}
                                    updateColumn={updateColumn}
                                    createTask={createTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    tasks={tasks.filter(
                                        (task) => task.columnId === col.id
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
                                    deleteColumn={deleteColumn}
                                    updateColumn={updateColumn}
                                    createTask={createTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    tasks={tasks.filter(
                                        (task) =>
                                            task.columnId === activeColumn.id
                                    )}
                                />
                            )}
                            {activeTask && (
                                <TaskCard
                                    task={activeTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                />
                            )}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>
            </div>
        </div>
    );

    function createTask(columnId) {
        const newTask = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        };

        setTasks([...tasks, newTask]);
    }

    function deleteTask(id) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }

    function updateTask(id, content) {
        const newTasks = tasks.map((task) => {
            if (task.id !== id) return task;
            return { ...task, content };
        });

        setTasks(newTasks);
    }

    // function createNewColumn() {
    //     const columnToAdd = {
    //         id: generateId(),
    //         title: `Column ${columns.length + 1}`,
    //     };

    //     setColumns([...columns, columnToAdd]);
    // }

    function deleteColumn(id) {
        const filteredColumns = columns.filter((col) => col.id !== id);
        setColumns(filteredColumns);

        const newTasks = tasks.filter((t) => t.columnId !== id);
        setTasks(newTasks);
    }

    function updateColumn(id, title) {
        const newColumns = columns.map((col) => {
            if (col.id !== id) return col;
            return { ...col, title };
        });

        setColumns(newColumns);
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

        if (activeId === overId) return;

        const isActiveAColumn = active.data.current?.type === "Column";
        if (!isActiveAColumn) return;

        console.log("DRAG END");

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex(
                (col) => col.id === activeId
            );
            const overColumnIndex = columns.findIndex(
                (col) => col.id === overId
            );

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
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
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
                    // Fix introduced after video recording
                    tasks[activeIndex].columnId = tasks[overIndex].columnId;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === "Column";

        // Im dropping a Task over a column
        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);

                tasks[activeIndex].columnId = overId;
                console.log("DROPPING TASK OVER COLUMN", { activeIndex });
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }
}
function generateId() {
    /* Generate a random number between 0 and 10000 */
    return Math.floor(Math.random() * 10001);
}
