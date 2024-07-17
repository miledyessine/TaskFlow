import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { ProjectCreate } from "@/components/ProjectDialog/ProjectCreate";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/axioshook";
import axios from "axios";

function Projects() {
    const [openCreate, setOpenCreate] = useState(false);
    const [projects, setProjects] = useState();
    const projectsData = useAxios({method: 'GET', url: '/projects' });
    const [users, setUsers] = useState({});
    const handleOpenCreateDialog = async () => {
        setOpenCreate(true);
    };
    useEffect(() => {
        if (projectsData.response ) {
            setProjects(projectsData.response);
        
        const userRequests = projectsData.response.map(project =>
            axios.get(`/users/${project.createdBy}`)
        );

        Promise.all(userRequests)
            .then(userResponses => {
                const userMap = {};
                userResponses.forEach((res, index) => {
                    userMap[projectsData.response[index].createdBy] = res.data.username;
                });
                setUsers(userMap);
            })
            .catch(err => console.error(err));
    }
    }, [projectsData.response]);
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
                    <ul className="grid w-full gap-7 p-4 sm:grid-cols-3 md:grid-cols-4 md:gap-4 sm:gap-5">
                        {projects.map(project => (
                            <ProjectCard
                                key={project._id}
                                id={project._id}
                                title={project.name}
                                description={project.description}
                                createdBy={users[project.createdBy]}
                            />
                        ))}
                    </ul>
                )}
            </div>
            {openCreate && (
                <ProjectCreate open={openCreate} setOpen={setOpenCreate} />
            )}
        </div>
    );
}

export default Projects;
