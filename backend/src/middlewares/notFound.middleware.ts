import type { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	res.status(500);
	next(new Error(`Route not found: ${req.originalUrl}`));
};
