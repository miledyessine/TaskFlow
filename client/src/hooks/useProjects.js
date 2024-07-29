import axios from "axios";
import { useEffect, useState } from "react";
import { useAxios } from "./axioshook";

export default () => {
    const [openCreate, setOpenCreate] = useState(false);
    const [projects, setProjects] = useState(null);
    const { customFetchData, fetchHandler } = useAxios();
    const [users, setUsers] = useState({});

    const handleOpenCreateDialog = async () => {
        setOpenCreate(true);
    };

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
    }, []);
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

    return {
        handleOpenCreateDialog,
        openCreate,
        setOpenCreate,
        projects,
        users,
    };
};
