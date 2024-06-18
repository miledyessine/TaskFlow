const { Task, Subtask } = require("../models/task.model");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const createTask = async (taskBody) => {
    return Task.create(taskBody);
};

const queryTasks = async (filter) => {
    try {
        const tasks = await Task.find({ ...filter });
        return tasks;
    } catch (error) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `Error while fetching task items: ${error.message}`
        );
    }
};

const getTask = async (id) => {
    return Task.findById(id);
};

const updateTask = async (taskId, updateBody) => {
    const task = await getTask(taskId);
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
    } else if (!toDest) {
        Object.assign(task, updateBody);
        await task.save();
        return task;
    }
};

const deleteTask = async (taskId) => {
    const task = await getTask(taskId);
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
    }
    await task.remove();
    return task;
};

const transferTaskToSprint = async (taskId, sprintId) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
    }

    if (!sprintId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Sprint ID is required");
    }

    task.sprint_id = sprintId;
    task.backlog_id = null;

    await task.save();
    return task;
};

const transferTaskToBacklog = async (taskId, backlogId) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
    }

    if (!backlogId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Backlog ID is required");
    }

    task.backlog_id = backlogId;
    task.sprint_id = null;

    await task.save();
    return task;
};

const createSubtask = async (subtaskBody) => {
    return Subtask.create(subtaskBody);
};

const querySubtasks = async (filter) => {
    try {
        const subtasks = await Subtask.find({ ...filter });
        return subtasks;
    } catch (error) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `Error while fetching subtask items: ${error.message}`
        );
    }
};

const getSubtask = async (id) => {
    return Subtask.findById(id);
};

const updateSubtask = async (subtaskId, updateBody) => {
    const subtask = await getSubtask(subtaskId);
    if (!subtask) {
        throw new ApiError(httpStatus.NOT_FOUND, "Subtask not found");
    }
    Object.assign(subtask, updateBody);
    await subtask.save();
    return subtask;
};

const deleteSubtask = async (subtaskId) => {
    const subtask = await getSubtask(subtaskId);
    if (!subtask) {
        throw new ApiError(httpStatus.NOT_FOUND, "Subtask not found");
    }
    await subtask.remove();
    return subtask;
};

module.exports = {
    createTask,
    queryTasks,
    getTask,
    updateTask,
    deleteTask,
    transferTaskToSprint,
    transferTaskToBacklog,
    createSubtask,
    querySubtasks,
    getSubtask,
    updateSubtask,
    deleteSubtask,
};
