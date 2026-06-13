import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({ error: "User name is required!" }).min(3, "Name too short"),
    email: z.string({ error: "Email is required!" }).email(),
    password: z.string({ error: "Password is required!" }).min(6),
    phone: z.number({ error: "Only numbers are allowed!" }).min(1000000000, "Phone is required!").max(9999999999, "Invalid phone number!"),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;