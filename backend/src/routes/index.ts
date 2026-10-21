import processMiningRouter from "../modules/process/process.route.js";
import projectRouter from "../modules/projects/project.routes.js";
import userRouter from "../modules/users/users.routes.js";
import taskRouter from "../modules/tasks/task.routes.js";
import authRouter from "../modules/auth/auth.routes.js";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/projects", projectRouter);
router.use("/process", processMiningRouter);

export default router;
