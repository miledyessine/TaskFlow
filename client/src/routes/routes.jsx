import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Projects from "@/pages/Projects";
import Project from "@/pages/Project";
import Sprint from "@/pages/Sprint";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "projects",
                element: <Projects />,
            },
            {
                path: "project/:project_id",
                element: <Project />,
            },
            {
                path: "sprint/:sprint_id",
                element: <Sprint />,
            },
        ],
    },
]);
export default router;
