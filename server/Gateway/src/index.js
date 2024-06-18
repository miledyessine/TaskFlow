const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const config = require("./config/config");
const setupSwagger = require("./swagger/swagger"); 
const app = express();

app.use(cors());

setupSwagger(app);

app.use(
    "/users",
    createProxyMiddleware({
        target: "http://localhost:3001",
        changeOrigin: true,
    })
);

app.use(
    "/projects",
    createProxyMiddleware({
        target: "http://localhost:3002",
        changeOrigin: true,
    })
);

app.use(
    "/backlogs",
    createProxyMiddleware({
        target: "http://localhost:3003",
        changeOrigin: true,
    })
);

app.use(
    "/sprints",
    createProxyMiddleware({
        target: "http://localhost:3004",
        changeOrigin: true,
    })
);

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
