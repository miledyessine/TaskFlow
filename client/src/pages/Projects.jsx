import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { ProjectCreate } from "@/components/ProjectDialog/ProjectCreate";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

function Projects() {
    const [openCreate, setOpenCreate] = useState(false);

    const handleOpenCreateDialog = async () => {
        setOpenCreate(true);
    };
    return (
        <div className="md:m-6 m-2">
            <div className="flex items-center justify-between ">
                <h3 className="text-2xl font-semibold tracking-tight">
                    Projects
                </h3>
                <Button variant="outline" onClick={handleOpenCreateDialog}>
                    Create a new project
                </Button>
            </div>

            <div className="classgroup mt-5">
                <ul className="grid w-full gap-7 p-4  sm:grid-cols-3 md:grid-cols-4 md:gap-4 sm:gap-5 ">
                        <ProjectCard
                            title={"test"}
                            description={"description"}
                            createdBy={"Yessine Miled"}
                        />
                    
                    <ProjectCard
                        title={"test"}
                        description={"description"}
                        createdBy={"Yessine Miled"}
                    />
                    <ProjectCard
                        title={"test"}
                        description={"description"}
                        createdBy={"Yessine Miled"}
                    />
                    <ProjectCard
                        title={"test"}
                        description={"description"}
                        createdBy={"Yessine Miled"}
                    />
                    <ProjectCard
                        title={"test"}
                        description={"description"}
                        createdBy={"Yessine Miled"}
                    />
                    <ProjectCard
                        title={"test"}
                        description={"description"}
                        createdBy={"Yessine Miled"}
                    />
                </ul>
            </div>
            {openCreate && (
                <ProjectCreate open={openCreate} setOpen={setOpenCreate} />
            )}
        </div>
    );
}

export default Projects;
