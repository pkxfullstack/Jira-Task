import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthTokenPayload } from "../modules/auth/auth.types.js";

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.cookies.token;
	console.log(token);
	if (!token) {
		return res.status(401).json({ message: "User Unauthenticated" });
	}

	try {
		const decoded = jwt.verify(token, env.JWT_SECRET);
		if (typeof decoded === "string" || typeof decoded.id !== "string") {
			return res.status(401).json({ message: "Invalid token" });
		}

		req.user = {
			id: decoded.id,
			email: String(decoded.email ?? ""),
		} satisfies AuthTokenPayload;
		next();
	} catch {
		return res.status(401).json({ message: "Invalid token" });
	}
}
