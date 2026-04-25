import type { TaskInput } from "./task.validation.js";
import pool from "../../config/db.js";

class TaskService {
    async createTask(data: TaskInput, userId: string) {
        const result = await pool.query(
            `INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *`,
            [data.title, data.description, userId]
        );

        return result.rows[0];
    }

    async getTasks(userId: string, id?: string) {
        console.log(id)
        if (id) {
            const result = await pool.query(
                "SELECT * FROM tasks WHERE user_id=$1 AND id=$2 ORDER BY created_at DESC",
                [userId, id]
            );
            return result.rows[0];

        }
        const result = await pool.query(
            "SELECT * FROM tasks WHERE user_id=$1 ORDER BY created_at DESC",
            [userId]
        );

        return result.rows;
    }
}

export default TaskService;