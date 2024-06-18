// File: swagger-definitions.js

module.exports = {
    User: {
        type: "object",
        properties: {
            username: { type: "string" },
            password: { type: "string" },
            email: { type: "string" },
            role: {
                type: "string",
                enum: ["admin", "team_leader", "team_member"],
            },
        },
        required: ["username", "password", "email", "role"],
    },
    Project: {
        type: "object",
        properties: {
            name: { type: "string" },
            description: { type: "string" },
            createdBy: { type: "string" }, // Assuming Schema.Types.ObjectId
            createdAt: { type: "string", format: "date-time" }, // Adjust format as per your schema
        },
        required: ["name", "createdBy"],
    },
    Backlog: {
        type: "object",
        properties: {
            project_id: { type: "string" }, // Assuming Schema.Types.ObjectId
            name: { type: "string" },
            description: { type: "string" },
        },
        required: ["project_id", "name"],
    },
    Sprint: {
        type: "object",
        properties: {
            project_id: { type: "string" }, // Assuming Schema.Types.ObjectId
            name: { type: "string" },
            description: { type: "string" },
            duration: {
                type: "string",
                enum: ["1week", "2weeks", "3weeks", "4weeks", "custom"],
            },
            start_date: { type: "string", format: "date-time" }, // Adjust format as per your schema
            end_date: { type: "string", format: "date-time" }, // Adjust format as per your schema
        },
        required: ["project_id", "name", "duration", "start_date"],
    },
    Task: {
        type: "object",
        properties: {
            backlog_id: { type: "string" }, // Assuming Schema.Types.ObjectId
            sprint_id: { type: "string" }, // Assuming Schema.Types.ObjectId
            name: { type: "string" },
            description: { type: "string" },
            status: {
                type: "string",
                enum: ["To Do", "In Progress", "Done"],
            },
            priority: { type: "integer" },
            due_date: { type: "string", format: "date-time" }, // Adjust format as per your schema
            assignee_id: { type: "string" }, // Assuming Schema.Types.ObjectId
        },
        required: ["name", "status", "priority"],
    },
    Subtask: {
        type: "object",
        properties: {
            task_id: { type: "string" }, // Assuming Schema.Types.ObjectId
            name: { type: "string" },
            description: { type: "string" },
            status: {
                type: "string",
                enum: ["To Do", "In Progress", "Done"],
            },
            priority: { type: "integer" },
            due_date: { type: "string", format: "date-time" }, // Adjust format as per your schema
            assignee_id: { type: "string" }, // Assuming Schema.Types.ObjectId
        },
        required: ["task_id", "name", "status", "priority"],
    },
};
