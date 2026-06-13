import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Minimum 6 characters"),
    // phone: z.number().min(10, "Invalid phone number"),
    phone: z.coerce.number().min(1000000000, "Invalid phone number")
});

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required").min(6, "Minimum 6 characters"),
});