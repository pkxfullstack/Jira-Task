import type { TaskInput } from "./task.validation.js";
import type { TaskFilters } from "./task.types.js";
declare class TaskService {
    createTask(data: TaskInput, userId: string): Promise<any>;
    getTasks(filters: TaskFilters, userId: string, id?: string): Promise<any>;
    updateTask(data: TaskInput, userId: string, id: string): Promise<any>;
    deleteTask(userId: string, id: string): Promise<any>;
}
export default TaskService;
//# sourceMappingURL=task.service.d.ts.map