import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({ error: "User name is required!" }).min(3, "Name too short"),
    email: z.string({ error: "Email is required!" }).email(),
    password: z.string({ error: "Password is required!" }).min(6),
    phone: z.number({ error: "Phone is required!" }).min(10),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;