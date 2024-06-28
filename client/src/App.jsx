import { useState, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home";
import { cn } from "./lib/utils";

import { Outlet } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
function App() {
    const { isAuthenticated } = useAuth0();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
        window.innerWidth <= 768
    );
const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsSidebarCollapsed(true);
            } else {
                setIsSidebarCollapsed(false);
            }
        };
    useEffect(() => {
        
        handleResize();

        window.addEventListener("resize", handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
                        : "pl-[230px]"
                )}
            >
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;
