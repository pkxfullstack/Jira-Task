import { z } from "zod";

export const userSchema = z.object({
	name: z.string().min(3, "Name is required"),
	email: z.string(),
	system_role: z.string().min(3, "Role is required"),
	phone: z.string(),
});
