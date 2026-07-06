import type { NextFunction, Request, Response } from "express";
import type TaskService from "./task.service.js";
declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    createTask: (req: Request, res: Response, next: NextFunction) => void;
    getTasks: (req: Request, res: Response, next: NextFunction) => void;
    updateTask: (req: Request, res: Response, next: NextFunction) => void;
    deleteTask: (req: Request, res: Response, next: NextFunction) => void;
}
export default TaskController;
//# sourceMappingURL=task.controller.d.ts.map