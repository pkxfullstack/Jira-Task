import type { Request, Response } from "express";
import { env } from "../../config/env.js";
import { ApiError } from "../../shared/utils/ApiError.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import type AuthService from "./auth.service.js";
import type { LoginInput, RegisterInput } from "./auth.validation.js";

const cookieOptions = {
	httpOnly: true,
	secure: env.NODE_ENV === "production",
	sameSite: "lax" as const,
	path: "/",
};

class AuthController {
	constructor(private authService: AuthService) {}

	register = asyncHandler(async (req: Request, res: Response) => {
		const data: RegisterInput = req.body;
		const result = await this.authService.register(data);
		return res.status(201).json({
			message: "User registered successfully!",
			success: true,
			data: result,
		});
	});

	login = asyncHandler(async (req: Request, res: Response) => {
		const data: LoginInput = req.body;
		const result = await this.authService.login(data);

		res.cookie("token", result.token, {
			...cookieOptions,
			maxAge: 15 * 60 * 1000,
		});

		return res.json({
			success: true,
			user: result.user,
		});
	});

	me = asyncHandler(async (req: Request, res: Response) => {
		if (!req.user) throw new ApiError(401, "User unauthenticated");

		const user = await this.authService.getMe(req.user.id);
		return res.json({ success: true, user });
	});

	logout = asyncHandler(async (_req: Request, res: Response) => {
		res.clearCookie("token", cookieOptions);
		return res.json({
			success: true,
			message: "Logged out successfully",
		});
	});
}

export default AuthController;
