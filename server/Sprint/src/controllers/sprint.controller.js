const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const pick = require("../utils/pick");
const catchAsync = require("../utils/catchAsync");
const sprintService = require("../services/sprint.service");

const createSprint = catchAsync(async (req, res) => {
    const sprint = await sprintService.createSprint(req.body);
    res.status(httpStatus.CREATED).send(sprint);
});

const getSprints = catchAsync(async (req, res) => {
    const filter = pick(req.query, ["project_id", "name"]);
    const sprints = await sprintService.querySprints(filter);
    res.status(httpStatus.OK).send(sprints);
});

const getSprint = catchAsync(async (req, res) => {
    const sprint = await sprintService.getSprint(req.params.id);
    if (!sprint) {
        throw new ApiError(httpStatus.NOT_FOUND, "Sprint not found");
    }
    res.status(httpStatus.OK).send(sprint);
});


const updateSprint = catchAsync(async (req, res) => {
    const sprint = await sprintService.updateSprint(req.params.id, req.body);
    res.status(httpStatus.OK).send(sprint);
});

const deleteSprint = catchAsync(async (req, res) => {
    await sprintService.deleteSprint(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createSprint,
    getSprints,
    getSprint,
    updateSprint,
    deleteSprint,
};
