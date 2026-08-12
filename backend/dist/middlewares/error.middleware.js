import { ApiError } from "../shared/utils/ApiError.js";
import logger from "../shared/logger/logger.js";
export const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
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
//# sourceMappingURL=error.middleware.js.map