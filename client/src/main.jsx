import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import "./styles/tailwind.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import router from "./routes/routes";
import { Auth0Provider } from "@auth0/auth0-react";
import authConfig from "../auth_config.json";
import { SocketContext, socket } from "@/context/socket";
const { domain, clientId } = authConfig;
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <SocketContext.Provider value={socket}>
                <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                    <RouterProvider router={router} />
                </ThemeProvider>
            </SocketContext.Provider>
        </Auth0Provider>
    </React.StrictMode>
);
