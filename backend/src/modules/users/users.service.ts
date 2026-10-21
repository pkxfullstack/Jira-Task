import pool from "../../config/db.js";
import type { UserType } from "./user.types.js";

class UserService {
    async getAllUser(page: number, limit: number) {
        const { rows } = await pool.query<UserType[]>(
            `SELECT 
            id, name, email, phone, profile_image_url, system_role, created_at 
            FROM users ORDER BY created_at LIMIT $1 OFFSET $2`,
            [limit, (page - 1) * limit]
        );
        return rows;
    };
}

export default UserService;