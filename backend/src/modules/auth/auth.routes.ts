import { Router } from "express";
import AuthService from "./auth.service.js";
import AuthController from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import { registerSchema } from "./auth.validation.js";
const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", authController.login);
router.get("/me", authController.me);

export default router;