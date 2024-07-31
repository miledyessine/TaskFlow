import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { useAxios } from "./axioshook";
import { SocketContext } from "@/context/socket";


export default () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [projects, setProjects] = useState(null);
    const { customFetchData, fetchHandler } = useAxios();
    const [users, setUsers] = useState({});
    const socket = useContext(SocketContext);
    
    
    useEffect(() => {
        const handleProjectUpdate = () => {
            customFetchData({ method: "GET", url: "/projects" })
                .then((projectResult) => {
                    if (projectResult.data) {
                        setProjects(projectResult.data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching projects:", error);
                });
        };
        socket.on('ProjectListModified', handleProjectUpdate);
        
    }, []);
    
    useEffect(() => {
        customFetchData({ method: "GET", url: "/projects" })
            .then((projectResult) => {
                if (projectResult.data) {
                    setProjects(projectResult.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }, [customFetchData]);

    useEffect(() => {
        if (fetchHandler.response && fetchHandler.response.length > 0) {
            setProjects(fetchHandler.response);
            const userRequests = fetchHandler.response.map((project) =>
                axios.get(`/users/${project.createdBy}`)
            );

            Promise.all(userRequests)
                .then((userResponses) => {
                    const userMap = {};
                    userResponses.forEach((res, index) => {
                        userMap[fetchHandler.response[index].createdBy] =
                            res.data.username;
                    });
                    setUsers(userMap);
                })
                .catch((err) => console.error(err));
        }
    }, [fetchHandler.response]);

    const handleOpenCreateDialog = () => {
        setOpenCreate(true);
    };

    return {
        handleOpenCreateDialog,
        openCreate,
        setOpenCreate,
        projects,
        setProjects,
        users,
    };
};
