import express, { type NextFunction, type Request, type Response } from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import logger from "./shared/logger/logger.js";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { v4 as uuid } from "uuid";
import pool from "./config/db.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const app = express();
pool.connect()
    .then(async () => {
        const res = await pool.query('SELECT NOW()');
        console.log(res.rows);
        logger.info(`✅ PostgreSQL Connected`);
    })
    .catch(err => {
        logger.error(`❌ Connection Error PostgreSQL:`, err);
    });
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: "*", }));

// 🧾 Logging
app.use(morgan("dev"));

// 🧠 Body parser
app.use(express.json({ limit: "1mb" }));

app.use((
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.id = uuid();
    next();
});
// 👉 routes yaha add honge
app.use('/api/v1/', routes);
// ❌ Not found
app.use(notFound);

// 💥 Global error handler
app.use(errorHandler);


export default app;