import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import type UserService from "./users.service.js";
import type { Request, Response } from "express";

class UserController {
    constructor(private UserService: UserService) { }
    getUserList = asyncHandler(async (
        req: Request,
        res: Response
    ) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const users = await this.UserService.getAllUser(page, limit);

        return res.json({
            message: "User reterived!",
            success: true,
            data: users,
        });
    })
}

export default UserController;