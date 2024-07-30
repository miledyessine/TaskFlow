/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */


import {
    Pencil,
    Trash2,
    Workflow,
    Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SubtaskEdit } from "../SubtaskDialog/SubtaskEdit";
import { TaskView } from "../TaskDialog/TaskView";
import { useAxios } from "@/hooks/axioshook";

const priorityColors = {
    Urgent: "text-red-800",
    High: "text-red-500",
    Normal: "text-orange-500",
    Low: "text-green-500",
};

function SubtaskCard({ subtask,projectId, deleteSubtask }) {
    const [mouseIsOver, setMouseIsOver] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [openDetail, setOpenDetail] = useState(false);
    const handleSave = (updatedTask) => {
        updateTask(subtask._id, updatedTask);
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
    const userFetcher = useAxios();
    const [userData, setUserData] = useState();
    const fetchData = () => {
        userFetcher
            .customFetchData({
                method: "GET",
                url: `/users/${subtask.assignee_id}`,
            })
            .then((userResult) => {
                setUserData(userResult.data);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);
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
                            onClick={() => deleteSubtask(subtask._id)}
                            className="flex items-center justify-center hover:text-red-500 cursor-pointer"
                        />
                    </div>
                )}

                <div className="flex items-center gap-1">
                    <span
                        className={`flex items-center ${
                            priorityColors[subtask.priority]
                        }`}
                    >
                        <Workflow size={14} />
                    </span>
                    <h3 className="font-bold text-sm">{subtask.name}</h3>
                </div>

                <p className="text-gray-700 text-xs">{subtask.description}</p>
            </div>
            {openView && (
                <TaskView task={subtask} assignee={userData} open={openView} setOpen={setOpenView} />
            )}
            {openEdit && <SubtaskEdit subtask={subtask} assignee={userData}  projectId={projectId} open={openEdit} setOpen={setOpenEdit} />}
        </>
    );
}

export default SubtaskCard;
