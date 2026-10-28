import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { validate } from "../../middlewares/validate.js";
import UserController from "./users.controller.js";
import UserService from "./users.service.js";
import { createUserSchema } from "./users.validations.js";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get("/", authMiddleware, userController.getUserList);
router.post(
	"/",
	authMiddleware,
	validate(createUserSchema),
	userController.createUser,
);
export default router;
