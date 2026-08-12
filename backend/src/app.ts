import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import helmet from "helmet";
import morgan from "morgan";
import { v4 as uuid } from "uuid";
import pool from "./config/db.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import routes from "./routes/index.js";
import logger from "./shared/logger/logger.js";

const app = express();
pool
	.connect()
	.then(async () => {
		const res = await pool.query("SELECT NOW()");
		console.log(res.rows);
		logger.info(`✅ PostgreSQL Connected`);
	})
	.catch((err) => {
		logger.error(`❌ Connection Error PostgreSQL:`, err);
	});
app.use(helmet());
app.use(cookieParser());
app.use(
	cors({
		origin: env.CLIENT_ORIGIN,
		credentials: true,
	}),
);

// 🧾 Logging
app.use(morgan("dev"));

// 🧠 Body parser
app.use(express.json({ limit: "1mb" }));

app.use((req: Request, _res: Response, next: NextFunction) => {
	req.id = uuid();
	next();
});
// 👉 routes yaha add honge
app.use("/api/v1/", routes);
// ❌ Not found
app.use(notFound);

// 💥 Global error handler
app.use(errorHandler);

export default app;
