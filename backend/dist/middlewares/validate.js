export const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        console.log("Validation result:", req.body.phone, result);
        if (!result.success) {
            const formattedErrors = {};
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
//# sourceMappingURL=validate.js.map