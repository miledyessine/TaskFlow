/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "../ui/date-picker";

import { format } from "date-fns";
import { useAxios } from "@/hooks/axioshook";
import { useParams } from "react-router-dom";
export function SubtaskFormCreate({ projectId, taskId, className }) {
    const [formData, setFormData] = useState({
        task_id: taskId,
        name: "",
        description: "",
        status: "",
        typeOfTicket: "",
        priority: "",
        assignee: "",
        due_date: "",
    });

    const { project_id } = useParams();
    const url = projectId
        ? `/projects/${projectId}`
        : `/projects/${project_id}`;
    const [project, setProject] = useState(null);
    const [users, setUsers] = useState([]);
    const projectFetcher = useAxios();
    const usersFetcher = useAxios();

    const fetchData = () => {
        projectFetcher
            .customFetchData({
                method: "GET",
                url: url,
            })
            .then((projectResult) => {
                setProject((prev) => ({ ...prev, ...projectResult.data }));
            })
            .catch((error) => {
                console.error("Error fetching project:", error);
            });

        usersFetcher
            .customFetchData({
                method: "GET",
                url: `/users`,
            })
            .then((usersResult) => {
                setUsers(usersResult.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [project_id, projectId]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleDueDateSelect = (selectedDate) => {
        const formattedDate = format(selectedDate, "MM/dd/yyyy");
        setFormData((prev) => ({
            ...prev,
            due_date: formattedDate,
        }));
    };

    const SubtaskCreation = useAxios();
    const onSubmit = async (e) => {
        e.preventDefault();
        const newAxiosParams = {
            method: "POST",
            url: "/tasks/subtasks",
            data: formData,
        };
        await SubtaskCreation.customFetchData(newAxiosParams).then((data) =>
            console.log(data)
        );
    };

    return (
        <form
            className={cn("grid items-start gap-4", className)}
            onSubmit={onSubmit}
        >
            <div className="grid gap-2">
                <Label required htmlFor="name">
                    Name
                </Label>
                <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
            </div>
            <div className="flex items-center justify-between gap-3">
                <div className="grid gap-2 w-full">
                    <Label required>Type Of Ticket</Label>
                    <Select
                        value={formData.typeOfTicket}
                        id="typeOfTicket"
                        required
                        onValueChange={(selectedOption) => {
                            handleInputChange({
                                target: {
                                    id: "typeOfTicket",
                                    value: selectedOption,
                                },
                            });
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {project &&
                                    project.typesOfTickets.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type.charAt(0).toUpperCase() +
                                                type.slice(1)}
                                        </SelectItem>
                                    ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2 w-full">
                    <Label required>Priority</Label>
                    <Select
                        value={formData.priority}
                        id="priority"
                        required
                        onValueChange={(selectedOption) => {
                            handleInputChange({
                                target: {
                                    id: "priority",
                                    value: selectedOption,
                                },
                            });
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Urgent">Urgent</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Normal">Normal</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex items-center justify-between gap-3">
                <div className="grid gap-2 w-full">
                    <Label required>Status</Label>
                    <Select
                        value={formData.status}
                        id="status"
                        required
                        onValueChange={(selectedOption) => {
                            handleInputChange({
                                target: {
                                    id: "status",
                                    value: selectedOption,
                                },
                            });
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {project &&
                                    project.workflow.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status.charAt(0).toUpperCase() +
                                                status.slice(1)}
                                        </SelectItem>
                                    ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2 w-full">
                    <Label required>Assignee</Label>
                    <Select
                        value={formData.assignee_id}
                        id="assignee_id"
                        required
                        onValueChange={(selectedOption) => {
                            handleInputChange({
                                target: {
                                    id: "assignee_id",
                                    value: selectedOption,
                                },
                            });
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select an assignee" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {users &&
                                    users.map((user) => (
                                        <SelectItem
                                            key={user._id}
                                            value={user._id}
                                        >
                                            {user.username}
                                        </SelectItem>
                                    ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid gap-2">
                <Label>Due Date</Label>
                <DatePicker id="due_date" onSelect={handleDueDateSelect} />
            </div>
            <Button type="submit">Save</Button>
        </form>
    );
}
