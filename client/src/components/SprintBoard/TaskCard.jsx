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
    ChevronUp,
    ChevronRight,
    CopyPlus,
    Workflow,
    Eye,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { TaskEdit } from "../TaskDialog/TaskEdit";
import SubtaskCard from "./SubtaskCard";
import { SubtaskEdit } from "../SubtaskDialog/SubtaskEdit";
import { SubtaskCreate } from "../SubtaskDialog/SubtaskCreate";
import { TaskView } from "../TaskDialog/TaskView";

const priorityColors = {
    1: "text-red-500",
    2: "text-orange-500",
    3: "text-green-500",
};

function TaskCard({ task, deleteTask, updateTask }) {
    const [mouseIsOver, setMouseIsOver] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [openDetail, setOpenDetail] = useState(false);
    const handleSave = (updatedTask) => {
        updateTask(task.id, updatedTask);
        setIsEditing(false);
    };
    const [openSubtask, setOpenSubtask] = useState(false);
    const handleOpenSubtask = async () => {
        setOpenSubtask(!openSubtask);
    };
    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);
    const handleOpenEditDialog = async () => {
        setOpenEdit(true);
    };
    const handleOpenViewDialog = () => {
        setOpenView(true);
    };
    const [openCreateSubtask, setOpenCreateSubtask] = useState(false);
    const handleOpenCreateSubtaskDialog = async () => {
        setOpenCreateSubtask(true);
    };
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 cursor-grab relative"
            />
        );
    }
    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2 cursor-grab relative"
                {...attributes}
                {...listeners}
                onMouseEnter={() => {
                    setMouseIsOver(true);
                }}
                onMouseLeave={() => {
                    setMouseIsOver(false);
                }}
            >
                {mouseIsOver && (
                    <div className="absolute bottom-2 p-1.5 gap-1.5 right-2 flex bg-gray-100 rounded-md shadow-lg border cursor-auto">
                        <Eye
                            className="flex items-center justify-center hover:text-gray-500 cursor-pointer"
                            size={16}
                            onMouseDown={handleOpenViewDialog}
                        />
                        <CopyPlus
                            size={16}
                            onClick={handleOpenCreateSubtaskDialog}
                            className="flex items-center justify-center hover:text-teal-700 cursor-pointer"
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
                        <Flag size={14} />
                    </span>
                    <h3 className="font-bold text-sm">{task.name}</h3>
                    {/* important change it when consume api to task.subtasks && task.subtasks.length > 0 */}
                    {!task.subtasks && (
                        <span
                            onClick={handleOpenSubtask}
                            className="cursor-pointer flex items-center text-xs text-gray-600"
                        >
                            <Workflow size={12} />5
                        </span>
                    )}
                </div>

                <p className="text-gray-700 text-xs">{task.description}</p>

                {!task.subtasks &&
                    // task.subtasks.length > 0 &&
                    (openSubtask ? (
                        <ChevronUp
                            className="right-0 mr-1 cursor-pointer"
                            size={16}
                            onClick={handleOpenSubtask}
                        />
                    ) : (
                        <ChevronDown
                            className="mr-1 cursor-pointer"
                            size={16}
                            onClick={handleOpenSubtask}
                        />
                    ))}
            </div>
            {openSubtask && (
                <SubtaskCard
                    task={task}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                />
            )}
            {openView && (
                <TaskView task={task} open={openView} setOpen={setOpenView} />
            )}
            {openEdit && <TaskEdit open={openEdit} setOpen={setOpenEdit} />}
            {openCreateSubtask && (
                <SubtaskCreate
                    open={openCreateSubtask}
                    setOpen={setOpenCreateSubtask}
                />
            )}
        </>
    );
}

export default TaskCard;
