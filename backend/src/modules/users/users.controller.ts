import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import type { CreateUserInput } from "./user.types.js";
import type UserService from "./users.service.js";

class UserController {
	constructor(private UserService: UserService) {}
	getUserList = asyncHandler(async (req: Request, res: Response) => {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 10;
		const users = await this.UserService.getAllUser(page, limit);

		return res.json({
			message: "User reterived!",
			success: true,
			data: users,
		});
	});

	createUser = asyncHandler(async (req: Request, res: Response) => {
		const data: CreateUserInput = req.body;
		const result = await this.UserService.createNewUser(data);
		if (!result) {
			throw new Error("User creation failed");
		}
		const { password, ...userWithoutPassword } = result;
		return res.status(201).json({
			message: "User registered successfully!",
			success: true,
			data: userWithoutPassword,
		});
	});
}

export default UserController;
