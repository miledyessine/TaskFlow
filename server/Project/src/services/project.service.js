const { Project } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const createProject = async (projectBody) => {
    return Project.create(projectBody);
};

// Get all projects
const queryProjects = async () => {
    const projects = await Project.find();
    return projects;
};

const getProjectById = async (id) => {
    return Project.findById(id);
};

const getProjectsByUser = async (userId) => {
    try {
        const projects = await Project.find({ createdBy: userId });
        return projects;
    } catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, `Could not fetch projects : ${error.message}`);
    }
};

const updateProjectById = async (projectId, updateBody) => {
    const project = await getProjectById(projectId);
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
    }
    Object.assign(project, updateBody);
    await project.save();
    return project;
};

const deleteProjectById = async (projectId) => {
    const project = await getProjectById(projectId);
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
    }
    await project.remove();
    return project;
};

module.exports = {
    createProject,
    queryProjects,
    getProjectById,
    getProjectsByUser,
    updateProjectById,
    deleteProjectById,
};
