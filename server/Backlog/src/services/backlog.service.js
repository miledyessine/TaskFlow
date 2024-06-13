const { Backlog } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const createBacklog = async (backlogBody) => {
    try {
        const backlog = await Backlog.create(backlogBody);
        return backlog;
    } catch (error) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `Error while creating backlog item: ${error.message}`
        );
    }
};

const getBacklogs = async () => {
    try {
        const backlogs = await Backlog.find();
        return backlogs;
    } catch (error) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `Error while fetching backlog items: ${error.message}`
        );
    }
};

const getBacklog = async (backlogId) => {
    try {
        const backlog = await Backlog.findById(backlogId);
        if (!backlog) {
            throw new ApiError(httpStatus.NOT_FOUND, "Backlog item not found");
        }
        return backlog;
    } catch (error) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `Error while fetching backlog item: ${error.message}`
        );
    }
};

// Get backlog by project
const getBacklogsByProject = async (projectId) => {
    try {
        const backlog = await Backlog.find({ project_id: projectId });
        return backlog;
    } catch (error) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `Could not fetch backlog: ${error.message}`
        );
    }
};

const updateBacklog = async (backlogId, updateBody) => {
    try {
        const backlog = await Backlog.findByIdAndUpdate(backlogId, updateBody, {
            new: true,
        });
        if (!backlog) {
            throw new ApiError(httpStatus.NOT_FOUND, "Backlog item not found");
        }
        return backlog;
    } catch (error) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `Error while updating backlog item: ${error.message}`
        );
    }
};

const deleteBacklog = async (backlogId) => {
    const backlog = await getBacklog(backlogId);
    if (!backlog) {
        throw new ApiError(httpStatus.NOT_FOUND, "Backlog not found");
    }
    await sprint.remove();
    return backlog;
};

module.exports = {
    createBacklog,
    getBacklogs,
    getBacklog,
    getBacklogsByProject,
    updateBacklog,
    deleteBacklog,
};
