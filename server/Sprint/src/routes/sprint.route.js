const express = require("express");
const sprintController = require("../controllers/sprint.controller");

const router = express.Router();

router
    .route("/")
    .post(sprintController.createSprint)
    .get(sprintController.getSprints);

router
    .route("/:id")
    .get(sprintController.getSprint)
    .patch(sprintController.updateSprint)
    .delete(sprintController.deleteSprint);

router.route("/project/:id").get(sprintController.getSprintsByProject);

module.exports = router;
