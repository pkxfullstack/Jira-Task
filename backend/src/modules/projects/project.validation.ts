import { z } from "zod";

export const projectSchema = z.object({
	title: z
		.string({ error: "Title is required!" })
		.min(1, { error: "Title is required!" }),
	description: z
		.string({ error: "Description is required!" })
		.min(1, { error: "Description is required!" }),
	priority: z
		.string({ error: "Priority is required!" })
		.min(1, { error: "Priority is required!" }),
});

export type ProjectInput = z.infer<typeof projectSchema>;
