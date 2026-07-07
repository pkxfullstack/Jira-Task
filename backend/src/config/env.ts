import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();
const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	CLIENT_ORIGIN: z.string().url().default("http://localhost:5173"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	console.error("❌ Invalid environment variables");
	console.error(parsed.error.format());
	process.exit(1);
}

export const env = parsed.data;
