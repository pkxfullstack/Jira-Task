import pool from "../../config/db.js";
import { ApiError } from "../../shared/utils/ApiError.js";
import { hashPassword } from "../../utils/password.js";
import type { CreateUserInput, UserType } from "./user.types.js";

class UserService {
	async getAllUser(page: number, limit: number) {
		const { rows } = await pool.query<UserType[]>(
			`SELECT 
            id, name, email, phone, profile_image_url, system_role, created_at 
            FROM users ORDER BY created_at LIMIT $1 OFFSET $2`,
			[limit, (page - 1) * limit],
		);
		return rows;
	}

	async createNewUser(data: CreateUserInput) {
		try {
			const hashedPassword = await hashPassword("Test@123");
			const result = await pool.query<CreateUserInput>(
				`INSERT INTO users (name, email, phone, system_role, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
				[data.name, data.email, data.phone, data.system_role, hashedPassword],
			);

			return result?.rows[0];
		} catch (error) {
			if (
				typeof error === "object" &&
				error !== null &&
				"code" in error &&
				error.code === "23505" &&
				"constraint" in error &&
				error.constraint === "users_email_key"
			) {
				throw new ApiError(409, "Email already exists");
			}

			throw error;
		}
	}
}

export default UserService;
