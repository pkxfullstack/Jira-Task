import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export const validate = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const formattedErrors: Record<string, string> = {};

            result.error.issues.forEach((err) => {
                const field = String(err.path[0] ?? "general");
                formattedErrors[field] = err.message;
            });

            return res.status(400).json({
                errors: formattedErrors,
            });
        }
        req.body = result.data;
        next();
    };
};