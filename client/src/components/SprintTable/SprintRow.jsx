/* eslint-disable react/prop-types */
import { TableCell, TableRow } from "@/components/ui/table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    Eye,
    Pencil,
    Trash2,
    ChevronDown,
    ChevronUp,
    Workflow,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { TaskEdit } from "../TaskDialog/TaskEdit";
import { TaskView } from "../TaskDialog/TaskView";

function SprintRow({ task }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
    });

    const [openSubtask, setOpenSubtask] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);

    const handleOpenSubtask = () => {
        setOpenSubtask(!openSubtask);
    };

    const handleOpenEditDialog = () => {
        setOpenEdit(true);
    };

    const handleOpenViewDialog = () => {
        setOpenView(true);
    };

    const handleDelete = () => {
        console.log("delete");
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        border: isDragging ? "1px dashed #aaa" : "none",
    };

    return (
        <>
            <TableRow
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
            >
                <TableCell className="max-w-full font-medium flex items-center">
                    {task.subtasks && task.subtasks.length > 0 ? (
                        openSubtask ? (
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
                        )
                    ) : (
                        <ChevronRight
                            className="mr-1 cursor-auto text-gray-500"
                            size={16}
                        />
                    )}
                    {task.name}
                    {task.subtasks && task.subtasks.length > 0 && (
                        <span
                            onClick={handleOpenSubtask}
                            className="ml-2 cursor-pointer flex items-center text-xs text-gray-600"
                        >
                            <Workflow size={13} />
                            {task.subtasks.length}
                        </span>
                    )}
                </TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell className="flex gap-2">
                    <Eye
                        className="cursor-pointer hover:text-gray-500"
                        size={16}
                        onMouseDown={handleOpenViewDialog}
                    />
                    <Pencil
                        className="cursor-pointer hover:text-green-800"
                        size={16}
                        onMouseDown={handleOpenEditDialog}
                    />
                    <Trash2
                        className="cursor-pointer hover:text-red-500"
                        size={16}
                        onMouseDown={handleDelete}
                    />
                </TableCell>
            </TableRow>
            {openSubtask && task.subtasks && (
                <>
                    {task.subtasks.map((subtask) => (
                        <TableRow key={subtask.id}>
                            <TableCell className=" pl-10 max-w-full font-medium flex items-center">
                                <Workflow size={14} className="mr-1" />
                                {subtask.name}
                            </TableCell>
                            <TableCell>{subtask.assignee}</TableCell>
                            <TableCell>{subtask.dueDate}</TableCell>
                            <TableCell>{subtask.status}</TableCell>
                            <TableCell className="flex gap-2">
                                <Eye
                                    className="cursor-pointer hover:text-gray-500"
                                    size={16}
                                    onMouseDown={handleOpenViewDialog}
                                />
                                <Pencil
                                    className="cursor-pointer hover:text-green-800"
                                    size={16}
                                    onMouseDown={handleOpenEditDialog}
                                />
                                <Trash2
                                    className="cursor-pointer hover:text-red-500"
                                    size={16}
                                    onMouseDown={handleDelete}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </>
            )}
            {openEdit && <TaskEdit open={openEdit} setOpen={setOpenEdit} />}
            {openView && (
                <TaskView task={task} open={openView} setOpen={setOpenView} />
            )}
        </>
    );
}

export default SprintRow;
