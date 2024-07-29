/* eslint-disable react/prop-types */
import { Crown, Settings2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { ProjectEdit } from "../ProjectDialog/ProjectEdit";
import { Link } from "react-router-dom";
function ProjectCard({ project, createdBy }) {
    const [open, setOpen] = useState(false);
    const { name, description } = project;
    const id = project._id;
    const handleOpenEditDialog = async () => {
        setOpen(true);
    };
    return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <Link to={`/project/${id}`}>
                            <span>{name}</span>
                        </Link>
                        <Button
                            variant="icon"
                            className="p-0"
                            onClick={handleOpenEditDialog}
                        >
                            <Settings2 size={24} />
                        </Button>
                    </CardTitle>
                </CardHeader>
                <Link to={`/project/${id}`}>
                    <CardContent>
                        <CardDescription>{description}</CardDescription>
                    </CardContent>
                    <CardFooter className="text-xs flex justify-end text-right ">
                        <Badge className="gap-0.5">
                            <Crown size={13} />
                            {createdBy}
                        </Badge>
                    </CardFooter>
                </Link>{open && <ProjectEdit project={project} open={open} setOpen={setOpen} />}
            </Card>
            
        
    );
}

export default ProjectCard;
