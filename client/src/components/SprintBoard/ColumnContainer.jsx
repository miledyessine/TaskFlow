/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

import TaskCard from "./TaskCard";
import { TicketPlus } from "lucide-react";
import { Button } from "../ui/button";

function ColumnContainer({
    projectId,
    column,
    createTask,
    tasks,
    deleteTask,
    updateTask,
}) {
    const tasksIds = useMemo(() => {
        return tasks.map((task) => task._id);
    }, [tasks]);
    const [, setOpen] = useState(false);
    const handleOpenCreateDialog = async () => {
        setOpen(true);
        createTask(column);
    };
    const { setNodeRef } = useSortable({
        id: column,
        data: {
            type: "Column",
            column,
        },
    });


    return (
        <div
            ref={setNodeRef}
            className="bg-gray-100 border-4 border-gray-100 w-full h-[500px] max-h-[500px] rounded-md flex flex-col"
        >
            {/* Column title */}
            <div className="bg-gray-950 text-white text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="flex justify-center items-center bg-gray-500 px-2 py-1 text-xs rounded-full">
                        {tasks?.length > 0 ? tasks.length : "0"}
                    </div>
                    {column}
                </div>
            </div>

            {/* Column task container */}
            <div className="flex flex-grow flex-col gap-2 p-2 overflow-x-hidden overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskCard
                            projectId={projectId}
                            key={task._id}
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
            {/* {open && (
                <TaskCreate
                    projectId={projectId}
                    statusCol={column}
                    sprint_id={sprint_id}
                    open={open}
                    setOpen={setOpen}
                    idType="sprint_id"
                />
            )} */}
        </div>
    );
}

export default ColumnContainer;
