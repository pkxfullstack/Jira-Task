import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validate = (schema: ZodType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.body);
		console.log("Validation result:", req.body.phone, result);
		if (!result.success) {
			const formattedErrors: Record<string, string> = {};

			result.error.issues.forEach((err) => {
				const field = String(err.path[0] ?? "general");
				formattedErrors[field] = err.message;
			});

			return res.status(422).json({
				success: false,
				message: "Validation failed",
				errors: formattedErrors,
			});
		}
		req.body = result.data;
		next();
	};
};
