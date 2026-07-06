import { Router } from "express";
import AuthService from "./auth.service.js";
import AuthController from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/signup", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/me", authMiddleware, authController.me);
router.post("/logout", authController.logout);

export default router;
