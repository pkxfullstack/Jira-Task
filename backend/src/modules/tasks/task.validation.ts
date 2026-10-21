import { z } from "zod";

export const taskSchema = z.object({
	title: z.string().min(1, { error: "Title is required!" }),
	description: z.string().min(1, { error: "Description is required!" }),
	priority: z.string().min(1, { error: "Choose task priority!" }),
	acceptance_criteria: z.string().min(1, { error: "Acceptance criteria is required!" }),
	type: z.string().min(1, { error: "Type is required!" }),
	project_id: z.string().min(1, { error: "Select a Project!" }),
});

export type TaskInput = z.infer<typeof taskSchema>;
