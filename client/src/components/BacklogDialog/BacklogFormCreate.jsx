/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAxios } from "@/hooks/axioshook";
import { useNavigate, useParams } from "react-router-dom";

export function BacklogFormCreate({ className }) {
    const { project_id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        project_id: project_id,
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { id, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const BacklogCreation = useAxios();
    const onSubmit = async (e) => {
        e.preventDefault();
        const newAxiosParams = {
            method: "POST",
            url: "/backlogs",
            data: formData,
        };
        await BacklogCreation.customFetchData(newAxiosParams).then((data) =>
            console.log(data)
        );
        navigate(0);
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
            <Button type="submit">Save</Button>
        </form>
    );
}
