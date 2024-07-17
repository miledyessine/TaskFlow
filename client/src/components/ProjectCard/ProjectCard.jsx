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
function ProjectCard({ id,title, description, createdBy }) {
    const [open, setOpen] = useState(false);

    const handleOpenEditDialog = async () => {
        setOpen(true);
    };
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <Link to={`/project/${id}`}>
                            <span>{title}</span>
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
                    <CardFooter className="text-xs justify-end text-right ">
                        <Badge className="gap-0.5">
                            <Crown size={13} />
                            {createdBy}
                        </Badge>
                    </CardFooter>
                </Link>
            </Card>
            {open && <ProjectEdit open={open} setOpen={setOpen} />}
        </div>
    );
}

export default ProjectCard;
