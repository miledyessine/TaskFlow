/* eslint-disable react/prop-types */

import {
    PanelLeftOpen,
    PanelLeftClose,
    PieChart,
    House,
    FolderOpenDot,
    FileSpreadsheet,
} from "lucide-react";
import {
    Menu,
    MenuItem,
    Sidebar as RPSidebar,
    SubMenu,
} from "react-pro-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import { getInitials } from "@/hooks/getInitials";
import { useAxios } from "@/hooks/axioshook";
import { useEffect, useState } from "react";
const Sidebar = ({ isCollapsed, CollapseSidebar }) => {
    const { user } = useAuth0();
    const [projects, setProjects] = useState();
    const projectsFetcher = useAxios();
    const fetchData = () => {
        projectsFetcher
            .customFetchData({
                method: "GET",
                url: `/projects/`,
            })
            .then((projectsResult) => {
                setProjects(projectsResult.data);
            })
            .catch((error) => {
                console.error("Error fetching projects data:", error);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="overflow-hidden z-40 border-r-1 fixed top-[57px] h-full flex-col justify-between">
            <RPSidebar
                width={isCollapsed ? "80px" : "fit"}
                className="h-full bg-white"
                collapsed={isCollapsed}
                collapsedWidth="md"
                transitionDuration="500"
            >
                <div className="flex justify-center p-2 max-[600px]:p-4 text-sm font-semibold text-gray-700 dark:text-gray-50">
                    {isCollapsed ? (
                        <div className="relative w-full flex items-center ">
                            <Avatar className="max-[600px]:w-10 max-[600px]:h-10 ">
                                <Link to="/profile">
                                    <AvatarFallback>
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Link>
                            </Avatar>
                            <Button
                                variant="transparent"
                                className="absolute right-0 invisible md:visible h-10 w-10 p-0 pb-0.25 pl-1.5 max-w-[600px]:hidden"
                                onClick={() => CollapseSidebar(false)}
                            >
                                <PanelLeftOpen size={24} />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex w-full items-center justify-between transition-all duration-200">
                            <Avatar className="w-8 h-8">
                                <Link to="/profile">
                                    <AvatarFallback>
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Link>
                            </Avatar>
                            <Link to="/profile">
                                <span className="pl-1">{user.name}</span>
                            </Link>
                            <Button
                                variant="transparent"
                                className="invisible h-10 w-10 p-0 md:visible"
                                onClick={() => CollapseSidebar(true)}
                            >
                                <PanelLeftClose size={24} />
                            </Button>
                        </div>
                    )}
                </div>

                <Separator />
                <div className="flex h-[calc(100%-74px)] flex-col justify-between">
                    <Menu className="max-h-screen overflow-y-auto" closeOnClick>
                        <MenuItem
                            icon={<House size={22} />}
                            component={<Link to="/" />}
                        >
                            {" "}
                            {isCollapsed ? null : "Home"}{" "}
                        </MenuItem>
                        <MenuItem icon={<PieChart size={22} />}>
                            {" "}
                            {isCollapsed ? null : "Dashboard"}{" "}
                        </MenuItem>
                        <SubMenu
                            label={!isCollapsed ? "Projects" : null}
                            icon={<FolderOpenDot size={22} />}
                            component={<Link to="/projects" />}
                        >
                            {projects &&
                                projects.map((project) => (
                                    <MenuItem
                                        key={project._id}
                                        icon={<FileSpreadsheet size={22} />}
                                        component={
                                            <Link
                                                to={`/project/${project._id}`}
                                            />
                                        }
                                    >
                                        {project.name}
                                    </MenuItem>
                                ))}
                        </SubMenu>
                    </Menu>
                </div>
            </RPSidebar>
        </div>
    );
};

export default Sidebar;
