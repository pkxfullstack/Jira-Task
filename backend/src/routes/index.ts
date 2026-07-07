import { Router } from "express";
import authRouter from "../modules/auth/auth.routes.js";
import processMiningRouter from "../modules/process/process.route.js";
import taskRouter from "../modules/tasks/task.routes.js";

const router = Router();

router.use("/process", processMiningRouter);
router.use("/auth", authRouter);
router.use("/tasks", taskRouter);

export default router;
