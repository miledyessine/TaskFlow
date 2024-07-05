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
export function SprintForm({ className }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        duration: "", // Ensure duration starts as an empty string
        start_date: "",
        end_date: "",
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "duration") {
            if (value !== "custom") {
                // If duration is not "custom", disable end date and clear its value
                setFormData((prev) => ({
                    ...prev,
                    [id]: value,
                    end_date: "",
                }));
            } else {
                // If duration is "custom", enable end date
                setFormData((prev) => ({
                    ...prev,
                    [id]: value,
                }));
            }
        } else {
            // For other inputs like text and textarea
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
                <Label required htmlFor="name">Name</Label>
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
                    // requiredBtn={formData.duration === "custom"}
                    onSelect={handleStartDateSelect}
                />
            </div>
            <div className="grid gap-2">
                <Label required={formData.duration === "custom"}>End Date</Label>
                <DatePicker
                    id="end_date"
                    // requiredBtn={formData.duration === "custom"}
                    onSelect={handleEndDateSelect}
                    disabledBtn={formData.duration !== "custom"}
                />
            </div>
            <Button type="submit">Save</Button>
        </form>
    );
}
