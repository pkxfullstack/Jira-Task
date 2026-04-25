import winston from "winston";
import path from "path";
import fs from "fs";

const logDir = "logs";

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const isProd = process.env.NODE_ENV === "production";

const logger = winston.createLogger({
    level: isProd ? "info" : "debug",
    format: winston.format.combine(
        winston.format.timestamp(),
        // winston.format.json()
        winston.format.errors({ stack: true }),
        isProd
            ? winston.format.json()
            : winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
    ),
    transports: [
        new winston.transports.Console(),
        ...(isProd
            ? [
                new winston.transports.File({
                    filename: path.join(logDir, "error.log"),
                    level: "error",
                }),
                new winston.transports.File({
                    filename: path.join(logDir, "combined.log"),
                }),
            ]
            : []),
    ],
});

export default logger;