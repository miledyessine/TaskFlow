const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinitions = require("./swagger-definitions");
const swaggerPaths = require("./swagger-paths");

const options = {
    swaggerDefinition: {

        info: {
            title: "TaskFlow API Documentation",
            description: "API documentation for TaskFlow, managing tasks, projects, backlogs, sprints, and users",
            version: "1.0",
        },
        host: "localhost:3000",
        basePath: "/",
        schemes: ["http"],
        definitions: swaggerDefinitions,
        paths: swaggerPaths,
    },
    apis: [
        path.resolve(__dirname, "../../../User/src/routes/user.route.js"),
        path.resolve(__dirname, "../../../Project/src/routes/project.route.js"),
        path.resolve(__dirname, "../../../Backlog/src/routes/backlog.route.js"),
        path.resolve(__dirname, "../../../Sprint/src/routes/sprint.route.js"),
        path.resolve(__dirname, "../../../Task/src/routes/task.route.js"),
    ],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
