import type { Request, Response } from "express";
import { ApiError } from "../../shared/utils/ApiError.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import type TaskService from "./task.service.js";
import type { TaskFilters } from "./task.types.js";
import type { TaskInput } from "./task.validation.js";

const getUserId = (req: Request) => {
	if (!req.user) throw new ApiError(401, "User unauthenticated");
	return req.user.id;
};

class TaskController {
	constructor(private taskService: TaskService) {}

	createTask = asyncHandler(async (req: Request, res: Response) => {
		const data: TaskInput = req.body;
		const result = await this.taskService.createTask(data, getUserId(req));
		return res.json({
			message: "Task created!",
			success: true,
			data: result,
		});
	});

	getTasks = asyncHandler(async (req: Request, res: Response) => {
		const result = await this.taskService.getTasks(
			req.query as TaskFilters,
			getUserId(req),
			req.params.id as string,
		);
		return res.json({
			success: true,
			data: result,
		});
	});

	updateTask = asyncHandler(async (req: Request, res: Response) => {
		const data: TaskInput = req.body;
		const result = await this.taskService.updateTask(
			data,
			getUserId(req),
			req.params.id as string,
		);
		return res.json({
			success: true,
			data: result,
		});
	});

	deleteTask = asyncHandler(async (req: Request, res: Response) => {
		const result = await this.taskService.deleteTask(
			getUserId(req),
			req.params.id as string,
		);
		return res.json({
			success: true,
			data: result,
			message: "Task deleted!",
		});
	});
}

export default TaskController;
