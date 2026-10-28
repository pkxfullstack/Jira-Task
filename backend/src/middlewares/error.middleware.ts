import type { NextFunction, Request, Response } from "express";
import logger from "../shared/logger/logger.js";
import { ApiError } from "../shared/utils/ApiError.js";

export const errorHandler = (
	err: unknown,
	req: Request,
	res: Response,
	_next: NextFunction,
) => {
	let statusCode = 500;
	let message = "Internal Server Error";

	if (err instanceof ApiError) {
		statusCode = err.statusCode;
		message = err.message;
	} else if (err instanceof Error) {
		message = err.message;
	}

	logger.error({
		type: err instanceof ApiError ? "Operational" : "Unknown",
		message: err instanceof Error ? err.message : "Unknown error",
		stack: err instanceof Error ? err.stack : undefined,
		url: req.originalUrl,
		method: req.method,
	});
	return res.status(statusCode).json({
		success: false,
		message,
		...(process.env.NODE_ENV !== "production" && {
			stack: err instanceof Error ? err.stack : undefined,
		}),
	});
};
