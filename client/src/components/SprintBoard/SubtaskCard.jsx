/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    Pencil,
    Trash2,
    Goal,
    Flag,
    ChevronDown,
    Workflow,
    Eye,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { TaskEdit } from "../TaskDialog/TaskEdit";
import { SubtaskEdit } from "../SubtaskDialog/SubtaskEdit";
import { TaskView } from "../TaskDialog/TaskView";

const priorityColors = {
    1: "text-red-500",
    2: "text-orange-500",
    3: "text-green-500",
};

function SubtaskCard({ task, deleteTask, updateTask }) {
    const [mouseIsOver, setMouseIsOver] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [openDetail, setOpenDetail] = useState(false);
    const handleSave = (updatedTask) => {
        updateTask(task.id, updatedTask);
        setIsEditing(false);
    };

    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);
    const handleOpenEditDialog = async () => {
        setOpenEdit(true);
    };
    const handleOpenViewDialog = () => {
        setOpenView(true);
    };

    return (
        <>
            <div
                className="bg-white shadow-md rounded-lg p-4 mb-2.5 ml-4 flex flex-col gap-2 cursor-grab relative"
                onMouseEnter={() => {
                    setMouseIsOver(true);
                }}
                onMouseLeave={() => {
                    setMouseIsOver(false);
                }}
            >
                {mouseIsOver && (
                    <div className="absolute bottom-2 p-1.5 gap-2 right-2 flex bg-gray-100 rounded-md border shadow-lg cursor-auto">
                        <Eye
                            className="flex items-center justify-center hover:text-gray-500 cursor-pointer"
                            size={16}
                            onMouseDown={handleOpenViewDialog}
                        />
                        <Pencil
                            size={16}
                            className="flex items-center justify-center hover:text-green-800 cursor-pointer"
                            onClick={handleOpenEditDialog}
                        />
                        <Trash2
                            size={16}
                            onClick={() => deleteTask(task.id)}
                            className="flex items-center justify-center hover:text-red-500 cursor-pointer"
                        />
                    </div>
                )}

                <div className="flex items-center gap-1">
                    <span
                        className={`flex items-center ${
                            priorityColors[task.priority]
                        }`}
                    >
                        <Workflow size={14} />
                    </span>
                    <h3 className="font-bold text-sm">{task.name}</h3>
                </div>

                <p className="text-gray-700 text-xs">{task.description}</p>
            </div>
            {openView && (
                <TaskView task={task} open={openView} setOpen={setOpenView} />
            )}
            {openEdit && <SubtaskEdit open={openEdit} setOpen={setOpenEdit} />}
        </>
    );
}

export default SubtaskCard;
