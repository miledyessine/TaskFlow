import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { ProjectCreate } from "@/components/ProjectDialog/ProjectCreate";
import { Button } from "@/components/ui/button";
import useProjects from "@/hooks/useProjects";

function Projects() {
    const {
        handleOpenCreateDialog,
        openCreate,
        setOpenCreate,
        projects,
        setProjects,
        users,
    } = useProjects();

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
                {projects && (
                    <ul className="grid w-fit h-full gap-7 p-4 sm:grid-cols- md:grid-cols-3 lg:grid-cols-4  md:gap-4 sm:gap-5">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                setProjects={setProjects}
                                createdBy={users[project.createdBy]}
                            />
                        ))}
                    </ul>
                )}
            </div>
            {openCreate && (
                <ProjectCreate setProjects={setProjects} open={openCreate} setOpen={setOpenCreate} />
            )}
        </div>
    );
}

export default Projects;
