const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const pick = require('../utils/pick');
const catchAsync = require("../utils/catchAsync");
const { taskService } = require("../services");

const createTask = catchAsync(async (req, res) => {
    const task = await taskService.createTask(req.body);
    res.status(httpStatus.CREATED).send(task);
});

const getTasks = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['backlog_id','sprint_id', 'name','status','priority','assignee_id']);
    const result = await taskService.queryTasks(filter);
    res.send(result);
});

const getTask = catchAsync(async (req, res) => {
    const task = await taskService.getTask(req.params.id);
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
    }
    res.send(task);
});

const updateTask = catchAsync(async (req, res) => {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.send(task);
});

const deleteTask = catchAsync(async (req, res) => {
    await taskService.deleteTask(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

const createSubtask = catchAsync(async (req, res) => {
    const subtask = await taskService.createSubtask(req.body);
    res.status(httpStatus.CREATED).send(subtask);
});

const getSubtasks = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['backlog_id','sprint_id', 'name','status','priority','assignee_id']);
    const result = await taskService.querySubtasks(filter);
    res.send(result);
});

const getSubtask = catchAsync(async (req, res) => {
    const subtask = await taskService.getSubtask(req.params.id);
    if (!subtask) {
        throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
    }
    res.send(subtask);
});

const updateSubtask = catchAsync(async (req, res) => {
    const subtask = await taskService.updateSubtask(req.params.id, req.body);
    res.send(subtask);
});

const deleteSubtask = catchAsync(async (req, res) => {
    await taskService.deleteSubtask(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
});

const transferTaskToSprint = catchAsync(async (req, res) => {
    const { task_id, sprint_id } = req.body;
    if (!task_id || !sprint_id) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Task ID and Sprint ID are required"
        );
    }
    const task = await taskService.transferTaskToSprint(task_id, sprint_id);
    res.status(httpStatus.OK).send(task);
});

const transferTaskToBacklog = catchAsync(async (req, res) => {
    const { task_id, backlog_id } = req.body;
    if (!task_id || !backlog_id) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Task ID and Backlog ID are required"
        );
    }
    const task = await taskService.transferTaskToBacklog(task_id, backlog_id);
    res.status(httpStatus.OK).send(task);
});

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    transferTaskToSprint,
    transferTaskToBacklog,
    createSubtask,
    getSubtasks,
    getSubtask,
    updateSubtask,
    deleteSubtask,
};
