import pool from "../../config/db.js";
class TaskService {
    async createTask(data, userId) {
        const result = await pool.query(`INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *`, [data.title, data.description, userId]);
        return result.rows[0];
    }
    async getTasks(filters, userId, id) {
        if (id) {
            const result = await pool.query(`SELECT * FROM tasks WHERE user_id = $1 AND id = $2`, [userId, id]);
            if (!result.rows.length) {
                throw new Error("Task not found");
            }
            return result.rows[0];
        }
        let baseQuery = `FROM tasks WHERE user_id = $1`;
        let values = [userId];
        let index = 2;
        //filter status
        if (filters.status) {
            baseQuery += ` AND status = $${index}`;
            values.push(filters.status);
            index++;
        }
        //filter priority
        if (filters.priority) {
            baseQuery += ` AND priority = $${index}`;
            values.push(filters.priority);
            index++;
        }
        //filter search
        if (filters.search) {
            baseQuery += ` AND LOWER(title) LIKE LOWER($${index})`;
            values.push(`%${filters.search}%`);
            index++;
        }
        const countQuery = `SELECT COUNT(*) ${baseQuery}`;
        const countResult = await pool.query(countQuery, values);
        const total = Number(countResult.rows[0].count);
        // 🔥 sorting
        let dataQuery = `SELECT * ${baseQuery} ORDER BY created_at DESC`;
        //pagination
        const limit = 10;
        const page = Math.max(1, Number(filters.page) || 1);
        const offset = (page - 1) * limit;
        dataQuery += ` LIMIT $${index} OFFSET $${index + 1}`;
        const dataValues = [...values, limit, offset];
        const result = await pool.query(dataQuery, dataValues);
        return {
            tasks: result.rows,
            currentPage: page,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
    async updateTask(data, userId, id) {
        const result = await pool.query(`UPDATE tasks SET title=$1, description=$2, updated_at = CURRENT_TIMESTAMP  WHERE user_id=$3 AND id=$4 RETURNING *`, [data.title, data.description, userId, id]);
        if (!result.rows.length) {
            throw new Error("Task not found");
        }
        return result.rows[0];
    }
    async deleteTask(userId, id) {
        const result = await pool.query(`DELETE FROM tasks WHERE user_id=$1 AND id=$2 RETURNING *`, [userId, id]);
        if (result.rowCount === 0) {
            throw new Error("Task not found");
        }
        return result.rows[0];
    }
}
export default TaskService;
//# sourceMappingURL=task.service.js.map