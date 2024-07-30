/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    Pencil,
    Trash2,
    Flag,
    ChevronDown,
    ChevronUp,
    CopyPlus,
    Workflow,
    Eye,
} from "lucide-react";
import { useEffect, useState } from "react";

import { TaskEdit } from "../TaskDialog/TaskEdit";
import SubtaskCard from "./SubtaskCard";
import { SubtaskCreate } from "../SubtaskDialog/SubtaskCreate";
import { TaskView } from "../TaskDialog/TaskView";
import { useAxios } from "@/hooks/axioshook";

const priorityColors = {
    Urgent: "text-red-800",
    High: "text-red-500",
    Normal: "text-orange-500",
    Low: "text-green-500",
};

function TaskCard({ projectId, task, deleteTask }) {
    const [mouseIsOver, setMouseIsOver] = useState(false);

    const [userData, setUserData] = useState();
    const [subtasks, setSubtasks] = useState();

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
    const SubtaskDelete = useAxios();
    function deleteSubtask(id) {
        const newAxiosParams = {
            method: "DELETE",
            url: `/tasks/subtasks/${id}`,
        };
        SubtaskDelete.customFetchData(newAxiosParams).then((data) =>
            console.log(data)
        );
        console.log("delete");
        const newSubtasks = subtasks.filter((sub) => sub._id !== id);
        setSubtasks(newSubtasks);
    }
    const userFetcher = useAxios();
    const subtasksFetcher = useAxios();
    const fetchData = () => {
        userFetcher
            .customFetchData({
                method: "GET",
                url: `/users/${task.assignee_id}`,
            })
            .then((userResult) => {
                setUserData(userResult.data);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
        subtasksFetcher
            .customFetchData({
                method: "GET",
                url: `/tasks/subtasks?task_id=${task._id}`,
            })
            .then((subtasksResult) => {
                setSubtasks(subtasksResult.data);
            })
            .catch((error) => {
                console.error("Error fetching subtasks:", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task._id,
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
                            onClick={() => deleteTask(task._id)}
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
                    {subtasks && subtasks.length > 0 && (
                        <span
                            onClick={handleOpenSubtask}
                            className="cursor-pointer flex items-center text-xs text-gray-600"
                        >
                            <Workflow size={12} />
                            {subtasks.length}
                        </span>
                    )}
                </div>

                <p className="text-gray-700 text-xs">{task.description}</p>

                {subtasks &&
                    subtasks.length > 0 &&
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
            {openSubtask &&
                subtasks.length > 0 &&
                subtasks.map((subtask) => (
                    <SubtaskCard
                        key={subtask._id}
                        projectId={projectId}
                        subtask={subtask}
                        deleteSubtask={deleteSubtask}
                    />
                ))}
            {openView && (
                <TaskView
                    assignee={userData}
                    task={task}
                    open={openView}
                    setOpen={setOpenView}
                />
            )}
            {openEdit && (
                <TaskEdit
                    projectId={projectId}
                    task={task}
                    assignee={userData}
                    open={openEdit}
                    setOpen={setOpenEdit}
                />
            )}
            {openCreateSubtask && (
                <SubtaskCreate
                    projectId={projectId}
                    taskId={task._id}
                    open={openCreateSubtask}
                    setOpen={setOpenCreateSubtask}
                />
            )}
        </>
    );
}

export default TaskCard;
