import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import type ProjectService from "./project.service.js";

class ProjectController {
	constructor(private projectService: ProjectService) {}

	createProject = asyncHandler(async (req: Request, res: Response) => {
		const result = await this.projectService.createProject(
			req.body,
			req.user?.id as string,
		);
		return res.json({
			message: "Project created!",
			success: true,
			data: result,
		});
	});
}

export default ProjectController;
