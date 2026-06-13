import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import type { NextFunction, Request, Response } from "express";
import type { LoginInput, RegisterInput } from "./auth.validation.js";
import type AuthService from "./auth.service.js";

class AuthController {
    constructor(private authService: AuthService) { }
    register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const data: RegisterInput = req.body;
        const result = await this.authService.register(data);
        return res.json({
            message: "User registered successfully!",
            success: true,
            data: result,
        })
    });

    login = asyncHandler(async (req: Request, res: Response) => {
        const data: LoginInput = req.body;
        const result = await this.authService.login(data);
        res.cookie("token", result.token, {
            httpOnly: true,     // 🔥 JS access nahi kar sakta
            secure: true,       // HTTPS required
            sameSite: "strict", // CSRF protection
            maxAge: 15 * 60 * 1000, // 15 min
        });

        return res.json({
            success: true,
            user: result.user,
            token: result.token
        });
    });

    me = asyncHandler(async (req: Request, res: Response) => {
        const result = await this.authService.getMe(req.user);
        res.json(result);
    });
}

export default AuthController