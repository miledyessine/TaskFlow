module.exports = {
    "/users": {
        post: {
            tags: ["User Service"],
            summary: "Create a new user",
            description: "Endpoint to create a new user.",
            responses: {
                201: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/User",
                    },
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "user",
                    in: "body",
                    description: "User object that needs to be created",
                    required: true,
                    schema: {
                        $ref: "#/definitions/User",
                    },
                },
            ],
        },
        get: {
            tags: ["User Service"],
            summary: "Get all users",
            description: "Endpoint to retrieve all users.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        type: "array",
                        items: {
                            $ref: "#/definitions/User",
                        },
                    },
                },
                default: {
                    description: "Unexpected error",
                },
            },
        },
    },
    "/users/{id}": {
        get: {
            tags: ["User Service"],
            summary: "Get user by ID",
            description: "Endpoint to retrieve a user by ID.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/User",
                    },
                },
                404: {
                    description: "User not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the user to retrieve",
                    required: true,
                    type: "string",
                },
            ],
        },
        patch: {
            tags: ["User Service"],
            summary: "Update user by ID",
            description: "Endpoint to update a user by ID.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/User",
                    },
                },
                404: {
                    description: "User not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the user to update",
                    required: true,
                    type: "string",
                },
                {
                    name: "user",
                    in: "body",
                    description: "Updated user object",
                    required: true,
                    schema: {
                        $ref: "#/definitions/User",
                    },
                },
            ],
        },
        delete: {
            tags: ["User Service"],
            summary: "Delete user by ID",
            description: "Endpoint to delete a user by ID.",
            responses: {
                204: {
                    description: "User deleted successfully",
                },
                404: {
                    description: "User not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the user to delete",
                    required: true,
                    type: "string",
                },
            ],
        },
    },
    "/projects": {
        post: {
            tags: ["Project Service"],
            summary: "Create a new project",
            description: "Endpoint to create a new project.",
            responses: {
                201: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Project",
                    },
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "project",
                    in: "body",
                    description: "Project object that needs to be created",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Project",
                    },
                },
            ],
        },
        get: {
            tags: ["Project Service"],
            summary: "Get all projects",
            description: "Endpoint to retrieve all projects.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        type: "array",
                        items: {
                            $ref: "#/definitions/Project",
                        },
                    },
                },
                default: {
                    description: "Unexpected error",
                },
            },
        },
    },
    "/projects/{id}": {
        get: {
            tags: ["Project Service"],
            summary: "Get project by ID",
            description: "Endpoint to retrieve a project by ID.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Project",
                    },
                },
                404: {
                    description: "Project not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the project to retrieve",
                    required: true,
                    type: "string",
                },
            ],
        },
        patch: {
            tags: ["Project Service"],
            summary: "Update project by ID",
            description: "Endpoint to update a project by ID.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Project",
                    },
                },
                404: {
                    description: "Project not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the project to update",
                    required: true,
                    type: "string",
                },
                {
                    name: "project",
                    in: "body",
                    description: "Updated project object",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Project",
                    },
                },
            ],
        },
        delete: {
            tags: ["Project Service"],
            summary: "Delete project by ID",
            description: "Endpoint to delete a project by ID.",
            responses: {
                204: {
                    description: "Project deleted successfully",
                },
                404: {
                    description: "Project not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the project to delete",
                    required: true,
                    type: "string",
                },
            ],
        },
    },
    "/backlogs": {
        post: {
            tags: ["Backlog Service"],
            summary: "Create a new backlog",
            description: "Endpoint to create a new backlog.",
            responses: {
                201: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Backlog",
                    },
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "backlog",
                    in: "body",
                    description: "Backlog object that needs to be created",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Backlog",
                    },
                },
            ],
        },
        get: {
            tags: ["Backlog Service"],
            summary: "Get all backlogs",
            description: "Endpoint to retrieve all backlogs.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        type: "array",
                        items: {
                            $ref: "#/definitions/Backlog",
                        },
                    },
                },
                default: {
                    description: "Unexpected error",
                },
            },
        },
    },
    "/backlogs/{id}": {
        get: {
            tags: ["Backlog Service"],
            summary: "Get backlog by ID",
            description: "Endpoint to retrieve a backlog by ID.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Backlog",
                    },
                },
                404: {
                    description: "Backlog not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the backlog to retrieve",
                    required: true,
                    type: "string",
                },
            ],
        },

        patch: {
            tags: ["Backlog Service"],
            summary: "Update backlog by ID",
            description: "Endpoint to update a backlog by ID.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Backlog",
                    },
                },
                404: {
                    description: "Backlog not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the backlog to update",
                    required: true,
                    type: "string",
                },
                {
                    name: "backlog",
                    in: "body",
                    description: "Updated backlog object",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Backlog",
                    },
                },
            ],
        },
        delete: {
            tags: ["Backlog Service"],
            summary: "Delete backlog by ID",
            description: "Endpoint to delete a backlog by ID.",
            responses: {
                204: {
                    description: "Backlog deleted successfully",
                },
                404: {
                    description: "Backlog not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the backlog to delete",
                    required: true,
                    type: "string",
                },
            ],
        },
    },
    "/sprints": {
        post: {
            tags: ["Sprint Service"],
            summary: "Create a new sprint",
            description: "Endpoint to create a new sprint.",
            responses: {
                201: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Sprint",
                    },
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "sprint",
                    in: "body",
                    description: "Sprint object that needs to be created",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Sprint",
                    },
                },
            ],
        },
        get: {
            tags: ["Sprint Service"],
            summary: "Get all sprints",
            description: "Endpoint to retrieve all sprints.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        type: "array",
                        items: {
                            $ref: "#/definitions/Sprint",
                        },
                    },
                },
                default: {
                    description: "Unexpected error",
                },
            },
        },
    },
    "/sprints/{id}": {
        get: {
            tags: ["Sprint Service"],
            summary: "Get sprint by ID",
            description: "Endpoint to retrieve a sprint by ID.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Sprint",
                    },
                },
                404: {
                    description: "Sprint not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the sprint to retrieve",
                    required: true,
                    type: "string",
                },
            ],
        },
        patch: {
            tags: ["Sprint Service"],
            summary: "Update sprint by ID",
            description: "Endpoint to update a sprint by ID.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Sprint",
                    },
                },
                404: {
                    description: "Sprint not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the sprint to update",
                    required: true,
                    type: "string",
                },
                {
                    name: "sprint",
                    in: "body",
                    description: "Updated sprint object",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Sprint",
                    },
                },
            ],
        },
        delete: {
            tags: ["Sprint Service"],
            summary: "Delete sprint by ID",
            description: "Endpoint to delete a sprint by ID.",
            responses: {
                204: {
                    description: "Sprint deleted successfully",
                },
                404: {
                    description: "Sprint not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the sprint to delete",
                    required: true,
                    type: "string",
                },
            ],
        },
    },
    "/tasks": {
        post: {
            tags: ["Task Service"],
            summary: "Create a new task",
            description: "Endpoint to create a new task.",
            responses: {
                201: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Task",
                    },
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "task",
                    in: "body",
                    description: "Task object that needs to be created",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Task",
                    },
                },
            ],
        },
        get: {
            tags: ["Task Service"],
            summary: "Get all tasks",
            description: "Endpoint to retrieve all tasks.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        type: "array",
                        items: {
                            $ref: "#/definitions/Task",
                        },
                    },
                },
                default: {
                    description: "Unexpected error",
                },
            },
        },
    },
    "/tasks/{id}": {
        get: {
            tags: ["Task Service"],
            summary: "Get task by ID",
            description: "Endpoint to retrieve a task by ID.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Task",
                    },
                },
                404: {
                    description: "Task not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the task to retrieve",
                    required: true,
                    type: "string",
                },
            ],
        },
        patch: {
            tags: ["Task Service"],
            summary: "Update task by ID",
            description: "Endpoint to update a task by ID.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Task",
                    },
                },
                404: {
                    description: "Task not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the task to update",
                    required: true,
                    type: "string",
                },
                {
                    name: "task",
                    in: "body",
                    description: "Updated task object",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Task",
                    },
                },
            ],
        },
        delete: {
            tags: ["Task Service"],
            summary: "Delete task by ID",
            description: "Endpoint to delete a task by ID.",
            responses: {
                204: {
                    description: "Task deleted successfully",
                },
                404: {
                    description: "Task not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the task to delete",
                    required: true,
                    type: "string",
                },
            ],
        },
    },
    "/subtasks": {
        post: {
            tags: ["Task Service"],
            summary: "Create a new subtask",
            description: "Endpoint to create a new subtask.",
            responses: {
                201: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Subtask",
                    },
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "subtask",
                    in: "body",
                    description: "Subtask object that needs to be created",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Subtask",
                    },
                },
            ],
        },
        get: {
            tags: ["Task Service"],
            summary: "Get all subtasks",
            description: "Endpoint to retrieve all subtasks.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        type: "array",
                        items: {
                            $ref: "#/definitions/Subtask",
                        },
                    },
                },
                default: {
                    description: "Unexpected error",
                },
            },
        },
    },
    "/subtasks/{id}": {
        get: {
            tags: ["Task Service"],
            summary: "Get subtask by ID",
            description: "Endpoint to retrieve a subtask by ID.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Subtask",
                    },
                },
                404: {
                    description: "Subtask not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the subtask to retrieve",
                    required: true,
                    type: "string",
                },
            ],
        },
        patch: {
            tags: ["Task Service"],
            summary: "Update subtask by ID",
            description: "Endpoint to update a subtask by ID.",
            responses: {
                200: {
                    description: "Successful operation",
                    schema: {
                        $ref: "#/definitions/Subtask",
                    },
                },
                404: {
                    description: "Subtask not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the subtask to update",
                    required: true,
                    type: "string",
                },
                {
                    name: "subtask",
                    in: "body",
                    description: "Updated subtask object",
                    required: true,
                    schema: {
                        $ref: "#/definitions/Subtask",
                    },
                },
            ],
        },
        delete: {
            tags: ["Task Service"],
            summary: "Delete subtask by ID",
            description: "Endpoint to delete a subtask by ID.",
            responses: {
                204: {
                    description: "Subtask deleted successfully",
                },
                404: {
                    description: "Subtask not found",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of the subtask to delete",
                    required: true,
                    type: "string",
                },
            ],
        },
    },
    "/transfer-to-sprint": {
        post: {
            tags: ["Task Service"],
            summary: "Transfer task to sprint",
            description: "Endpoint to transfer a task to a sprint.",
            responses: {
                200: {
                    description: "Successful operation",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "transferData",
                    in: "body",
                    description: "Data object containing task ID and sprint ID",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            task_id: {
                                type: "string",
                                description:
                                    "The ID of the task to be transferred",
                            },
                            sprint_id: {
                                type: "string",
                                description:
                                    "The ID of the sprint to transfer the task to",
                            },
                        },
                    },
                },
            ],
        },
    },
    "/transfer-to-backlog": {
        post: {
            tags: ["Task Service"],
            summary: "Transfer task to backlog",
            description: "Endpoint to transfer a task to a backlog.",
            responses: {
                200: {
                    description: "Successful operation",
                },
                default: {
                    description: "Unexpected error",
                },
            },
            parameters: [
                {
                    name: "transferData",
                    in: "body",
                    description:
                        "Data object containing task ID and backlog ID",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            task_id: {
                                type: "string",
                                description:
                                    "The ID of the task to be transferred",
                            },
                            backlog_id: {
                                type: "string",
                                description:
                                    "The ID of the backlog to transfer the task to",
                            },
                        },
                    },
                },
            ],
        },
    },
};
