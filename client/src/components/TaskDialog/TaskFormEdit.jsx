/* eslint-disable react/prop-types */
import { useState } from "react";
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
export function TaskFormEdit({ task,assignee,className }) {
    const [formData, setFormData] = useState({
        name: task.name ||"",
        description: task.description ||"",
        status: task.status ||"",
        typeOfTicket: task.typeOfTicket ||"",
        priority: task.priority ||"",
        assignee: assignee._id ||"",
        due_date: format(task.due_date, "MM/dd/yyyy") ||"",
    });
console.log(formData);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Form submission logic here
    };

    return (
        <form
            className={cn("grid items-start gap-4", className)}
            onSubmit={handleSubmit}
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
                            <SelectValue placeholder={formData.typeOfTicket||"Select a type"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="bug">Bug</SelectItem>
                                <SelectItem value="task">Task</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2 w-full">
                    <Label required>Priority</Label>
                    <Select
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
                            <SelectValue placeholder={formData.priority||"Select a priority"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="urgent">Urgent</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex items-center justify-between gap-3">
            <div className="grid gap-2 w-full">
                <Label required>Status</Label>
                <Select
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
                        <SelectValue placeholder={formData.status||"Select a status"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="inProgress">
                                In Progress
                            </SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div><div className="grid gap-2 w-full">
                <Label required>Assignee</Label>
                <Select
                    id="assignee"
                    required
                    onValueChange={(selectedOption) => {
                        handleInputChange({
                            target: {
                                id: "assignee",
                                value: selectedOption,
                            },
                        });
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={assignee.username||"Select an assignee"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="yessine">Yessine</SelectItem>
                            <SelectItem value="miled">Miled</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            </div>
            
            <div className="grid gap-2">
                <Label>Due Date</Label>
                <DatePicker id="due_date" datePlaceholder={formData.due_date} onSelect={handleDueDateSelect} />
            </div>
            

            <Button type="submit">Save</Button>
        </form>
    );
}
