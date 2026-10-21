import pool from "../../config/db.js";
import type { ProjectInput } from "./project.validation.js";

class ProjectService {
    async createProject(data: ProjectInput, userId: string) {
        const result = await pool.query(
            `INSERT INTO projects (title, description, priority, status, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [data.title, data.description, data.priority, 'active', userId],
        );
        return result.rows[0];
    }

}

export default ProjectService;