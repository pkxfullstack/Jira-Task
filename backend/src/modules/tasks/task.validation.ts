import { z } from "zod";

export const taskSchema = z.object({
    title: z.string({ error: "Title is required!" }),
    description: z.string({ error: "Description is required!" })
});

export type TaskInput = z.infer<typeof taskSchema>;