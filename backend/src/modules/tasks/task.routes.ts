import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { validate } from "../../middlewares/validate.js";
import TaskController from "./task.controller.js";
import { taskSchema } from "./task.validation.js";
import TaskService from "./task.service.js";
import { Router } from "express";
const router = Router();

const taskService = new TaskService()
const taskController = new TaskController(taskService);

//prefix written in index router: tasks
router.post("/", authMiddleware, validate(taskSchema), taskController.createTask);
router.get("/:id", authMiddleware, taskController.getTasks);
router.get("/", authMiddleware, taskController.getTasks);
router.patch("/:id", authMiddleware, validate(taskSchema), taskController.updateTask);
router.delete("/:id", authMiddleware, taskController.deleteTask);

export default router;