import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import type { TaskInput } from "./task.validation.js";
import type { NextFunction, Request, Response } from "express";
import type TaskService from "./task.service.js";

class TaskController {
    constructor(private taskService: TaskService) { }

    createTask = asyncHandler(async (req: Request, res: Response) => {
        const data: TaskInput = req.body;
        const result = await this.taskService.createTask(data, req.user.id);
        return res.json({
            message: "Task created!",
            success: true,
            data: result
        });
    });

    getTasks = asyncHandler(async (req: Request, res: Response) => {
        const result = await this.taskService.getTasks(req.user.id, req.params.id as string);
        return res.json({
            success: true,
            data: result
        });
    })
}

export default TaskController;