const Sprint = require("../models/sprint.model");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

// Create a new sprint
const createSprint = async (sprintBody) => {
    return Sprint.create(sprintBody);
};

// Get all sprints
const querySprints = async (filter) => {
    try {
        const sprints = await Sprint.find({ ...filter });
        return sprints;
    } catch (error) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `Error while fetching sprint items: ${error.message}`
        );
    }
};

// Get a sprint by ID
const getSprint = async (id) => {
    return Sprint.findById(id);
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
    await sprint.deleteOne();
    return sprint;
};

module.exports = {
    createSprint,
    querySprints,
    getSprint,
    updateSprint,
    deleteSprint,
};
