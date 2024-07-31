import { useState } from "react";
import Footer from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { cn } from "./lib/utils";

import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery } from "./hooks/useMediaQuery";
function App() {
    const { isAuthenticated } = useAuth0();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(!isDesktop);

    return (
        <>
            <Navbar />
            {isAuthenticated && (
                <Sidebar
                    isCollapsed={isSidebarCollapsed}
                    CollapseSidebar={setIsSidebarCollapsed}
                />
            )}
            <main
                className={cn(
                    "w-full p-2 pt-[60px] transition-all duration-500",
                    !isAuthenticated
                        ? "p-4"
                        : isSidebarCollapsed
                        ? "pl-[80px]"
                        : "pl-[280px]"
                )}
            >
                <Outlet />
            </main>
        </>
    );
}

export default App;
