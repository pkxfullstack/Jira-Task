export const notFound = (req, res, next) => {
    res.status(500);
    next(new Error(`Route not found: ${req.originalUrl}`));
};
//# sourceMappingURL=notFound.middleware.js.map