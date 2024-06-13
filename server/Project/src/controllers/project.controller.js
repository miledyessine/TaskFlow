const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require('../utils/catchAsync');
const projectService = require('../services/project.service');

const createProject = catchAsync(async (req, res) => {
    const project = await projectService.createProject(req.body);
    res.status(httpStatus.CREATED).send(project);
});

const getProjects = catchAsync(async (req, res) => {
    const projects = await projectService.queryProjects();
    res.status(httpStatus.OK).send(projects);
});

const getProject = catchAsync(async (req, res) => {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
    }
    res.status(httpStatus.OK).send(project);
});

const getProjectsByUser = catchAsync(async (req, res) => {
    const project = await projectService.getProjectsByUser(req.params.id);
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Projects not found');
    }
    res.status(httpStatus.OK).send(project);
});

const updateProject = catchAsync(async (req, res) => {
    const project = await projectService.updateProjectById(req.params.id, req.body);
    res.status(httpStatus.OK).send(project);
});

const deleteProject = catchAsync(async (req, res) => {
    await projectService.deleteProjectById(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createProject,
    getProjects,
    getProject,
    getProjectsByUser,
    updateProject,
    deleteProject,
};
