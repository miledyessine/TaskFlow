/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import TaskCard from "./TaskCard";
import { BadgeX, TicketPlus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { TaskCreate } from "../TaskDialog/TaskCreate";

function ColumnContainer({
    column,
    deleteColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
}) {
    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    const [open, setOpen] = useState(false);
    const handleOpenCreateDialog = async () => {
        setOpen(true);
        createTask(column.id);
    };
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-gray-700 opacity-40 w-full h-[500px] max-h-[500px] rounded-md flex flex-col"
            ></div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-gray-100 border-4 border-gray-100 w-full h-[500px] max-h-[500px] rounded-md flex flex-col"
        >
            {/* Column title */}
            <div
                {...attributes}
                {...listeners}
                className="bg-gray-950 text-white text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold flex items-center justify-between"
            >
                <div className="flex gap-2">
                    <div className="flex justify-center items-center bg-gray-500 px-2 py-1 text-xs rounded-full">
                        {tasks.length}
                    </div>
                    {column.title}
                </div>
                <Trash2
                            className="cursor-pointer m-2 hover:text-red-500"
                            size={16}
                            onMouseDown={() => {
                                deleteColumn(column.id);
                            }}
                        />
                
            </div>

            {/* Column task container */}
            <div className="flex flex-grow flex-col gap-2 p-2 overflow-x-hidden overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                    ))}
                </SortableContext>
            </div>

            {/* Column footer */}

            <Button variant="outline" onClick={handleOpenCreateDialog}>
                <TicketPlus className="h-4 w-4 mr-1" />
                <span className="sr-only sm:not-sr-only">Add Task</span>
            </Button>
            {open && <TaskCreate open={open} setOpen={setOpen} />}
        </div>
    );
}

export default ColumnContainer;
