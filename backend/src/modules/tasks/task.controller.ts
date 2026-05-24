import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import type { NextFunction, Request, Response } from "express";
import type { TaskInput } from "./task.validation.js";
import type { TaskFilters } from "./task.types.js";
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
        const result = await this.taskService.getTasks(req.query as TaskFilters, req.user.id, req.params.id as string);
        return res.json({
            success: true,
            data: result
        });
    })

    updateTask = asyncHandler(async (req: Request, res: Response) => {
        const data: TaskInput = req.body;
        const result = await this.taskService.updateTask(data, req.user.id, req.params.id as string);
        return res.json({
            success: true,
            data: result
        });
    })

    deleteTask = asyncHandler(async (req: Request, res: Response) => {
        const result = await this.taskService.deleteTask(req.user.id, req.params.id as string);
        return res.json({
            success: true,
            data: result,
            message: "Task deleted!"
        });
    })
}

export default TaskController;