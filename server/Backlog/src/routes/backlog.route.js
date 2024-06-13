const express = require("express");
const backlogController = require("../controllers/backlog.controller");

const router = express.Router();

router
    .route("/")
    .post(backlogController.createBacklog)
    .get(backlogController.getBacklogs);

router
    .route("/:id")
    .get(backlogController.getBacklog)
    .patch(backlogController.updateBacklog)
    .delete(backlogController.deleteBacklog);

router.route("/project/:id").get(backlogController.getBacklogsByProject);

module.exports = router;
