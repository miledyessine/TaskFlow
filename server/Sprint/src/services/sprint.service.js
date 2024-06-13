const Sprint = require("../models/sprint.model");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

// Create a new sprint
const createSprint = async (sprintBody) => {
    return Sprint.create(sprintBody);
};

// Get all sprints
const querySprints = async () => {
    const sprints = await Sprint.find();
    return sprints;
};

// Get a sprint by ID
const getSprint = async (id) => {
    return Sprint.findById(id);
};

// Get sprints by project
const getSprintsByProject = async (projectId) => {
    try {
        const sprints = await Sprint.find({ project_id: projectId });
        return sprints;
    } catch (error) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `Could not fetch sprints: ${error.message}`
        );
    }
};

// Update a sprint by ID
const updateSprint = async (sprintId, updateBody) => {
    const sprint = await getSprint(sprintId);
    if (!sprint) {
        throw new ApiError(httpStatus.NOT_FOUND, "Sprint not found");
    }
    Object.assign(sprint, updateBody);
    await sprint.save();
    return sprint;
};

// Delete a sprint by ID
const deleteSprint = async (sprintId) => {
    const sprint = await getSprint(sprintId);
    if (!sprint) {
        throw new ApiError(httpStatus.NOT_FOUND, "Sprint not found");
    }
    await sprint.remove();
    return sprint;
};

module.exports = {
    createSprint,
    querySprints,
    getSprint,
    getSprintsByProject,
    updateSprint,
    deleteSprint,
};
