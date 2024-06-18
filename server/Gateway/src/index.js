const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const config = require("./config/config");

const app = express();
app.use(cors());

app.use(
    "/users",
    createProxyMiddleware({
        target: "http://localhost:3001",
        changeOrigin: true,
    })
);

// Proxy middleware for 'projects' service
app.use(
    "/projects",
    createProxyMiddleware({
        target: "http://localhost:3002",
        changeOrigin: true,
    })
);

// Proxy middleware for 'backlogs' service
app.use(
    "/backlogs",
    createProxyMiddleware({
        target: "http://localhost:3003",
        changeOrigin: true,
    })
);

// Proxy middleware for 'sprints' service
app.use(
    "/sprints",
    createProxyMiddleware({
        target: "http://localhost:3004",
        changeOrigin: true,
    })
);

// Proxy middleware for 'tasks' service
app.use(
    "/tasks",
    createProxyMiddleware({
        target: "http://localhost:3005",
        changeOrigin: true,
    })
);

app.listen(config.port, () => {
    console.log(`Gateway server is running on port ${config.port}`);
});
