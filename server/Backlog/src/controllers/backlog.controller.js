const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { backlogService } = require("../services");

const createBacklog = catchAsync(async (req, res) => {
    const backlog = await backlogService.createBacklog(req.body);
    res.status(httpStatus.CREATED).send(backlog);
});

const getBacklogs = catchAsync(async (req, res) => {
    const result = await backlogService.getBacklogs();
    res.send(result);
});

const getBacklog = catchAsync(async (req, res) => {
    const backlog = await backlogService.getBacklog(req.params.id);
    if (!backlog) {
        throw new ApiError(httpStatus.NOT_FOUND, "Backlog not found");
    }
    res.send(backlog);
});

const getBacklogsByProject = catchAsync(async (req, res) => {
    const backlog = await backlogService.getBacklogsByProject(req.params.id);
    if (!backlog) {
        throw new ApiError(httpStatus.NOT_FOUND, "Backlogs not found");
    }
    res.status(httpStatus.OK).send(backlog);
});

const updateBacklog = catchAsync(async (req, res) => {
    const backlog = await backlogService.updateBacklog(
        req.params.id,
        req.body
    );
    res.send(backlog);
});

const deleteBacklog = catchAsync(async (req, res) => {
    await backlogService.deleteBacklog(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createBacklog,
    getBacklogs,
    getBacklog,
    getBacklogsByProject,
    updateBacklog,
    deleteBacklog,
};
