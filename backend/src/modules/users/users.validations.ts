import { z } from "zod";

export const createUserSchema = z.object({
	name: z
		.string({ error: "User name is required!" })
		.min(1, { error: "User name is required!" })
		.min(3, "Name must contain at least 3 characters!"),
	email: z
		.string({ error: "Email is required!" })
		.trim()
		.min(1, { message: "Email is required!" })
		.email({ message: "Please enter a valid email address!" }),
	system_role: z
		.string({ error: "Please select any role!" })
		.min(1, "Please select any role"),
	phone: z
		.string({ error: "Phone number is required!" })
		.min(1, { error: "Phone number is required!" })
		.regex(/^\d{10}$/, "Phone must contain exactly 10 digits"),
});
