module.exports = {
    //  pm2 stop .\ecosystem.config.js
    apps: [
        {
            name: "GatewayService",
            script: "./Gateway/src/index.js",
            cwd: "./Gateway",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "1G",
            env: {
                NODE_ENV: "development",
                PORT: 3000,
            },
        },
        {
            name: "UserService",
            script: "./User/src/index.js",
            cwd: "./User",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "1G",
            env: {
                NODE_ENV: "development",
                PORT: 3001,
            },
        },
        {
            name: "ProjectService",
            script: "./Project/src/index.js",
            cwd: "./Project",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "1G",
            env: {
                NODE_ENV: "development",
                PORT: 3002,
            },
        },
        {
            name: "BacklogService",
            script: "./Backlog/src/index.js",
            cwd: "./Backlog",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "1G",
            env: {
                NODE_ENV: "development",
                PORT: 3003,
            },
        },
        {
            name: "SprintService",
            script: "./Sprint/src/index.js",
            cwd: "./Sprint",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "1G",
            env: {
                NODE_ENV: "development",
                PORT: 3004,
            },
        },
        {
            name: "TaskService",
            script: "./Task/src/index.js",
            cwd: "./Task",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "1G",
            env: {
                NODE_ENV: "development",
                PORT: 3005,
            },
        },
    ],
};
