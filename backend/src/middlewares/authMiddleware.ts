import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "User Unauthenticated" });
    }

    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET not defined");
        }
        const decoded = jwt.verify(token, secret!);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
}