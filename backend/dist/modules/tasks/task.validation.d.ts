import { z } from "zod";
export declare const taskSchema: z.ZodObject<{
    title: z.ZodString;
    priority: z.ZodString;
    description: z.ZodString;
}, z.core.$strip>;
export type TaskInput = z.infer<typeof taskSchema>;
//# sourceMappingURL=task.validation.d.ts.map