import { asyncHandler } from "../../shared/utils/asyncHandler.js";
class TaskController {
    taskService;
    constructor(taskService) {
        this.taskService = taskService;
    }
    createTask = asyncHandler(async (req, res) => {
        const data = req.body;
        const result = await this.taskService.createTask(data, req.user.id);
        return res.json({
            message: "Task created!",
            success: true,
            data: result
        });
    });
    getTasks = asyncHandler(async (req, res) => {
        const result = await this.taskService.getTasks(req.query, req.user.id, req.params.id);
        return res.json({
            success: true,
            data: result
        });
    });
    updateTask = asyncHandler(async (req, res) => {
        const data = req.body;
        const result = await this.taskService.updateTask(data, req.user.id, req.params.id);
        return res.json({
            success: true,
            data: result
        });
    });
    deleteTask = asyncHandler(async (req, res) => {
        const result = await this.taskService.deleteTask(req.user.id, req.params.id);
        return res.json({
            success: true,
            data: result,
            message: "Task deleted!"
        });
    });
}
export default TaskController;
//# sourceMappingURL=task.controller.js.map