const express = require("express");
const taskController = require("../controllers/task.controller");

const router = express.Router();
router
    .route("/")
    .post(taskController.createTask)
    .get(taskController.getTasks);

router
    .route("/transfer-to-sprint")
    .post(taskController.transferTaskToSprint);

router
    .route("/transfer-to-backlog")
    .post(taskController.transferTaskToBacklog);

router
    .route("/subtasks")
    .post(taskController.createSubtask)
    .get(taskController.getSubtasks);

router
    .route("/subtasks/:id")
    .get(taskController.getSubtask)
    .patch(taskController.updateSubtask)
    .delete(taskController.deleteSubtask);

router
    .route("/:id")
    .get(taskController.getTask)
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask);

module.exports = router;
