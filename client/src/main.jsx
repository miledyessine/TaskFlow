import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom"
import App from "./App.jsx";
import "./styles/tailwind.css";

import router from "./routes/routes"
import { Auth0Provider } from "@auth0/auth0-react";
import authConfig from "../auth_config.json";
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
            <RouterProvider router={router} />
        </Auth0Provider>
    </React.StrictMode>
);
