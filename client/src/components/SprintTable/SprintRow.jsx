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
    CopyPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TaskEdit } from "../TaskDialog/TaskEdit";
import { TaskView } from "../TaskDialog/TaskView";
import { useAxios } from "@/hooks/axioshook";
import { SubtaskCreate } from "../SubtaskDialog/SubtaskCreate";
import { SubtaskEdit } from "../SubtaskDialog/SubtaskEdit";

function SprintRow({ task }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task._id,
    });

    const [userData, setUserData] = useState();
    const [openSubtask, setOpenSubtask] = useState(false);
    const [subtasks, setSubtasks] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openEditsubtask, setOpenEditsubtask] = useState(false);
    const [openViewsubtask, setOpenViewsubtask] = useState(false);
    const handleOpenSubtask = () => {
        setOpenSubtask(!openSubtask);
    };

    const handleOpenEditDialog = () => {
        setOpenEdit(true);
    };

    const handleOpenViewDialog = () => {
        setOpenView(true);
    };
    const handleOpenEditSubtaskDialog = () => {
        setOpenEditsubtask(true);
    };

    const handleOpenViewSubtaskDialog = () => {
        setOpenViewsubtask(true);
    };

    const [openCreateSubtask, setOpenCreateSubtask] = useState(false);
    const handleOpenCreateSubtaskDialog = async () => {
        setOpenCreateSubtask(true);
    };
    const TaskDelete = useAxios();

    const handleDelete = () => {
        const newAxiosParams = {
            method: "DELETE",
            url: `/tasks/${task._id}`,
        };
        TaskDelete.customFetchData(newAxiosParams).then((data) =>
            console.log(data)
        );
        console.log("delete");
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
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        border: isDragging ? "1px dashed #aaa" : "none",
    };
    const userFetcher = useAxios();
    const subTasksFetcher = useAxios();
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

        subTasksFetcher
            .customFetchData({
                method: "GET",
                url: `/tasks/subtasks?task_id=${task._id}`,
            })
            .then((subTasksResult) => {
                if (subTasksResult.data && subTasksResult.data.length > 0) {
                    setSubtasks(
                        subTasksResult.data.filter(
                            (subtask) => subtask.task_id === task._id
                        ) || []
                    );
                }
            })
            .catch((error) => {
                console.error("Error fetching subTasks:", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <TableRow
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
            >
                <TableCell className="max-w-full font-medium flex items-center">
                    {subtasks && subtasks.length > 0 ? (
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
                    {subtasks && subtasks.length > 0 && (
                        <span
                            onClick={handleOpenSubtask}
                            className="ml-2 cursor-pointer flex items-center text-xs text-gray-600"
                        >
                            <Workflow size={13} />
                            {subtasks.length}
                        </span>
                    )}
                </TableCell>
                <TableCell>
                    {userData ? userData.username : "Loading..."}
                </TableCell>

                <TableCell>
                    {new Date(task.due_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                    })}
                </TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell className="flex gap-2">
                    <Eye
                        className="cursor-pointer hover:text-gray-500"
                        size={16}
                        onMouseDown={handleOpenViewDialog}
                    />
                    <CopyPlus
                        size={16}
                        onClick={handleOpenCreateSubtaskDialog}
                        className=" hover:text-teal-700 cursor-pointer"
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
            {openSubtask && subtasks && (
                <>
                    {subtasks.map((subtask) => (
                        <TableRow key={subtask._id}>
                            <TableCell className=" pl-10 max-w-full font-medium flex items-center">
                                <Workflow size={14} className="mr-1" />
                                {subtask.name}
                            </TableCell>
                            <TableCell>
                                {userData ? userData.username : "Loading..."}
                            </TableCell>
                            <TableCell>
                                {new Date(task.due_date).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                    }
                                )}
                            </TableCell>
                            <TableCell>{subtask.status}</TableCell>
                            <TableCell className="flex gap-2">
                                <Eye
                                    className="cursor-pointer hover:text-gray-500"
                                    size={16}
                                    onMouseDown={handleOpenViewSubtaskDialog}
                                />
                                <Pencil
                                    className="cursor-pointer hover:text-green-800"
                                    size={16}
                                    onMouseDown={handleOpenEditSubtaskDialog}
                                />
                                <Trash2
                                    className="cursor-pointer hover:text-red-500"
                                    size={16}
                                    onMouseDown={()=>deleteSubtask(subtask._id)}
                                />
                            </TableCell>
                            {openEditsubtask && (
                                <SubtaskEdit
                                    subtask={subtask}
                                    assignee={userData}
                                    open={openEditsubtask}
                                    setOpen={setOpenEditsubtask}
                                />
                            )}
                            {openViewsubtask && (
                                <TaskView
                                    task={subtask}
                                    assignee={userData}
                                    open={openViewsubtask}
                                    setOpen={setOpenViewsubtask}
                                />
                            )}
                        </TableRow>
                    ))}
                </>
            )}
            {openEdit && (
                <TaskEdit
                    task={task}
                    assignee={userData}
                    open={openEdit}
                    setOpen={setOpenEdit}
                />
            )}
            {openView && (
                <TaskView
                    task={task}
                    assignee={userData}
                    open={openView}
                    setOpen={setOpenView}
                />
            )}

            {openCreateSubtask && (
                <SubtaskCreate
                    taskId={task._id}
                    open={openCreateSubtask}
                    setOpen={setOpenCreateSubtask}
                />
            )}
        </>
    );
}

export default SprintRow;
