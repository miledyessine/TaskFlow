import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Projects from "@/pages/Projects";
import Project from "@/pages/Project";

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
                path:"profile",
                element: <Profile />,
            },
            {
                path:"projects",
                children:[
                    {
                        path:"",
                        element: <Projects />,
                    },
                    {
                        path:"test",
                        element: <Project />,
                    },
                ]
            }
        ],
    },
]);
export default router;
