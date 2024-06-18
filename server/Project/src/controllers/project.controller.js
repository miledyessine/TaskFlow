const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const projectService = require('../services/project.service');

const createProject = catchAsync(async (req, res) => {
    const project = await projectService.createProject(req.body);
    res.status(httpStatus.CREATED).send(project);
});

const getProjects = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['createdBy', 'name']);
    const projects = await projectService.queryProjects(filter);
    res.status(httpStatus.OK).send(projects);
});

const getProject = catchAsync(async (req, res) => {
    const project = await projectService.getProject(req.params.id);
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
    }
    res.status(httpStatus.OK).send(project);
});

const updateProject = catchAsync(async (req, res) => {
    const project = await projectService.updateProject(req.params.id, req.body);
    res.status(httpStatus.OK).send(project);
});

const deleteProject = catchAsync(async (req, res) => {
    await projectService.deleteProject(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
};
