import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { validate } from "../../middlewares/validate.js";
import ProjectController from "./project.controller.js";
import { projectSchema } from "./project.validation.js";
import ProjectService from "./project.service.js";
import { Router } from "express";


const router = Router();

const projectService = new ProjectService();
const projectController = new ProjectController(projectService);

router.post(
    "/",
    authMiddleware,
    validate(projectSchema),
    projectController.createProject,
);

export default router;