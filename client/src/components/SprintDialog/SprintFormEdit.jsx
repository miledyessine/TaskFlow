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
import { useAxios } from "@/hooks/axioshook";
import { Separator } from "../ui/separator";
export function SprintFormEdit({ sprint, setSprints, setOpen, className }) {
    const [formData, setFormData] = useState({
        name: sprint.name || "",
        description: sprint.description || "",
        duration: sprint.duration || "",
        start_date: format(sprint.start_date, "MM/dd/yyyy") || "",
        end_date: format(sprint.end_date, "MM/dd/yyyy") || "",
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "duration") {
            if (value !== "custom") {
                setFormData((prev) => ({
                    ...prev,
                    [id]: value,
                    end_date: "",
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    [id]: value,
                }));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [id]: value,
            }));
        }
    };

    const handleStartDateSelect = (selectedDate) => {
        const formattedDate = format(selectedDate, "MM/dd/yyyy");
        setFormData((prev) => ({
            ...prev,
            start_date: formattedDate,
        }));
    };

    const handleEndDateSelect = (selectedDate) => {
        const formattedDate = format(selectedDate, "MM/dd/yyyy");
        setFormData((prev) => ({
            ...prev,
            end_date: formattedDate,
        }));
    };
    const SprintDelete = useAxios();
    const deleteSprint = (e) => {
        e.preventDefault();
        const newAxiosParams = {
            method: "DELETE",
            url: `/sprints/${sprint._id}`,
        };
        SprintDelete.customFetchData(newAxiosParams).then(() => {
            setSprints((prevSprints) =>
                prevSprints.filter((spr) => spr._id !== sprint._id)
            );
            setOpen(false);
        });
    };
    const SprintEdit = useAxios();
    const onSubmit = async (e) => {
        e.preventDefault();
        const newAxiosParams = {
            method: "PATCH",
            url: `/sprints/${sprint._id}`,
            data: formData,
        };
        await SprintEdit.customFetchData(newAxiosParams).then((response) => {
            setSprints((prevSprints) =>
                prevSprints.map((s) =>
                    s._id === sprint._id ? response.data : s
                )
            );
            setOpen(false);
        });
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
            <div className="grid gap-2">
                <Label required>Duration</Label>
                <Select
                    value={formData.duration}
                    id="duration"
                    required
                    onValueChange={(selectedOption) => {
                        handleInputChange({
                            target: {
                                id: "duration",
                                value: selectedOption,
                            },
                        });
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1week">1 Week</SelectItem>
                            <SelectItem value="2weeks">2 Weeks</SelectItem>
                            <SelectItem value="3weeks">3 Weeks</SelectItem>
                            <SelectItem value="4weeks">4 Weeks</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label required>Start Date</Label>
                <DatePicker
                    id="start_date"
                    onSelect={handleStartDateSelect}
                    datePlaceholder={formData.start_date}
                />
            </div>
            <div className="grid gap-2">
                <Label required={formData.duration === "custom"}>
                    End Date
                </Label>
                <DatePicker
                    id="end_date"
                    onSelect={handleEndDateSelect}
                    disabledBtn={formData.duration !== "custom"}
                    datePlaceholder={formData.end_date}
                />
            </div>
            <Separator />
            <Button variant="destructive" onClick={deleteSprint}>
                Delete Sprint
            </Button>
            <Button type="submit">Save</Button>
        </form>
    );
}
