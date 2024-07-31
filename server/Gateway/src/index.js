const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const config = require("./config/config");
const setupSwagger = require("./swagger/swagger");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    },
});

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
        onProxyRes(proxyRes, req, res) {
            if (["POST", "PATCH", "DELETE"].includes(req.method)) {
                io.emit("projectUpdated");
            }
        },
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

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("projectUpdated", () => {
        socket.emit("ProjectListModified");
        console.log("projectUpdated")
    });
});

server.listen(config.port, () => {
    console.log(`Gateway server is running on port ${config.port}`);
});
