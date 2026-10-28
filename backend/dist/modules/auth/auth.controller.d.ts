import type { NextFunction, Request, Response } from "express";
import type AuthService from "./auth.service.js";
declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register: (req: Request, res: Response, next: NextFunction) => void;
    login: (req: Request, res: Response, next: NextFunction) => void;
    me: (req: Request, res: Response, next: NextFunction) => void;
}
export default AuthController;
//# sourceMappingURL=auth.controller.d.ts.map