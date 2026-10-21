import { authMiddleware } from "../../middlewares/authMiddleware.js";
import UserController from "./users.controller.js";
import UserService from "./users.service.js";
import { Router } from "express";

const router = Router()
const userService = new UserService()
const userController = new UserController(userService)

router.get("/", authMiddleware, userController.getUserList);
export default router;