const { Project } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const createProject = async (projectBody) => {
    return Project.create(projectBody);
};

// Get all projects
const queryProjects = async (filter) => {
    try {
        const projects = await Project.find({ ...filter });
        return projects;
    } catch (error) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `Error while fetching project items: ${error.message}`
        );
    }
};

const getProject = async (id) => {
    return Project.findById(id);
};

const updateProject = async (projectId, updateBody) => {
    const project = await getProject(projectId);
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
    }
    Object.assign(project, updateBody);
    await project.save();
    return project;
};

const deleteProject = async (projectId) => {
    const project = await getProject(projectId);
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
    }
    await project.deleteOne();
    return project;
};

module.exports = {
    createProject,
    queryProjects,
    getProject,
    updateProject,
    deleteProject,
};
