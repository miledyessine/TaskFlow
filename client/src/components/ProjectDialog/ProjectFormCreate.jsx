/* eslint-disable react/prop-types */
import { useState,useContext } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useAxios } from "@/hooks/axioshook";
import { useAuth0 } from "@auth0/auth0-react";
import { SocketContext } from "@/context/socket";


export function ProjectFormCreate({ setProjects,setOpen, className }) {
    const socket = useContext(SocketContext);
    const { user } = useAuth0();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        typesOfTickets: [""],
        workflow: ["", ""],
        createdBy: user.sub,
    });

    // a refaire
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleArrayChange = (index, key, e) => {
        const { value } = e.target;
        const updatedArray = [...formData[key]];
        updatedArray[index] = value;
        setFormData((prev) => ({ ...prev, [key]: updatedArray }));
    };

    const addTypeOfTicket = () => {
        setFormData((prev) => ({
            ...prev,
            typesOfTickets: [...prev.typesOfTickets, ""],
        }));
    };

    const addWorkflowStep = () => {
        setFormData((prev) => ({ ...prev, workflow: [...prev.workflow, ""] }));
    };

    const handleRemoveItem = (index, key, e) => {
        e.preventDefault();
        const updatedArray = [...formData[key]];
        updatedArray.splice(index, 1);
        setFormData((prev) => ({ ...prev, [key]: updatedArray }));
    };
    const ProjectCreation = useAxios();

    const onSubmit = async (e) => {
        e.preventDefault();
        const newAxiosParams = {
            method: "POST",
            url: "/projects",
            data: formData,
        };
        await ProjectCreation.customFetchData(newAxiosParams)
            .then((response) => {
                setProjects((prevProjects) => [...prevProjects, response.data]);
                setOpen(false)
                socket.emit('projectUpdated')
            })
            .catch((error) => {
                console.error("Error creating project:", error);
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
                <Label required>Types of Tickets</Label>
                {formData.typesOfTickets.map((ticket, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Input
                            type="text"
                            value={ticket}
                            onChange={(e) =>
                                handleArrayChange(index, "typesOfTickets", e)
                            }
                            required
                        />
                        <Button
                            variant="icon"
                            onClick={handleRemoveItem.bind(
                                null,
                                index,
                                "typesOfTickets"
                            )}
                        >
                            <Trash2 className="w-4 h-4 hover:text-red-500" />
                        </Button>
                    </div>
                ))}
                <Button variant="secondary" onClick={addTypeOfTicket}>
                    Add Type of Ticket
                </Button>
            </div>
            <div className="grid gap-2">
                <Label required>Workflow</Label>
                {formData.workflow.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Input
                            type="text"
                            value={step}
                            onChange={(e) =>
                                handleArrayChange(index, "workflow", e)
                            }
                            required
                        />
                        <Button
                            variant="icon"
                            onClick={handleRemoveItem.bind(
                                null,
                                index,
                                "workflow"
                            )}
                        >
                            <Trash2 className="w-4 h-4 hover:text-red-500" />
                        </Button>
                    </div>
                ))}
                <Button variant="secondary" onClick={addWorkflowStep}>
                    Add Workflow Step
                </Button>
            </div>
            <Button type="submit">Save</Button>
        </form>
    );
}
