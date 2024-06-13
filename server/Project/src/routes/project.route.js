const express = require("express");
const projectController = require("../controllers/project.controller");

const router = express.Router();

router
    .route("/")
    .post(projectController.createProject)
    .get(projectController.getProjects);

router
    .route("/:id")
    .get(projectController.getProject)
    .patch(projectController.updateProject)
    .delete(projectController.deleteProject);

router
    .route("/user/:id")
    .get(projectController.getProjectsByUser);

module.exports = router;
