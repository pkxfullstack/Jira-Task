import { z } from "zod";

export const signupSchema = z.object({
	name: z.string().min(3, "Name is required"),
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Minimum 6 characters"),
	phone: z.string().regex(/^\d{10}$/, "Phone must contain exactly 10 digits"),
});

export const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid email"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(6, "Minimum 6 characters"),
});
