import { asyncHandler } from "../../shared/utils/asyncHandler.js";
class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register = asyncHandler(async (req, res, next) => {
        const data = req.body;
        const result = await this.authService.register(data);
        return res.json({
            message: "User registered successfully!",
            success: true,
            data: result,
        });
    });
    login = asyncHandler(async (req, res) => {
        const data = req.body;
        const result = await this.authService.login(data);
        res.cookie("token", result.token, {
            httpOnly: true, // 🔥 JS access nahi kar sakta
            secure: true, // HTTPS required
            sameSite: "strict", // CSRF protection
            maxAge: 15 * 60 * 1000, // 15 min
        });
        return res.json({
            success: true,
            user: result.user,
            token: result.token
        });
    });
    me = asyncHandler(async (req, res) => {
        const result = await this.authService.getMe(req.user);
        res.json(result);
    });
}
export default AuthController;
//# sourceMappingURL=auth.controller.js.map