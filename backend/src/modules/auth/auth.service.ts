import { ApiError } from "../../shared/utils/ApiError.js";
import type { LoginInput } from "./auth.validation.js";
import type { AuthUser, RegisterData } from "./auth.types.js";
import { env } from "../../config/env.js";
import pool from "../../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthService {
    private toAuthUser(user: Record<string, unknown>): AuthUser {
        return {
            id: String(user.id),
            name: String(user.name),
            email: String(user.email),
            ...(user.profile_image
                ? { profileImageUrl: String(user.profile_image) }
                : {}),
            systemRole: String(user.system_role),
        };
    }

    async register(data: RegisterData) {
        const { name, email, password, phone } = data;
        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            throw new ApiError(400, "Email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (name, email, password, phone, system_role)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name, email`,
            [name, email, hashedPassword, phone, "user"]
        );

        return result.rows[0];
    }

    async login(data: LoginInput) {
        const { email, password } = data;
        const result = await pool.query(
            `SELECT id, name, email, password, profile_image_url, system_role
             FROM users WHERE email = $1`,
            [email]
        );

        const user = result.rows[0];
        if (!user) {
            throw new ApiError(400, "Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new ApiError(400, "Invalid credentials");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        return {
            token,
            user: this.toAuthUser(user),
        };
    }

    async getMe(userId: string) {
        const result = await pool.query(
            `SELECT id, name, email, profile_image_url, system_role
             FROM users WHERE id = $1`,
            [userId]
        );

        if (!result.rows[0]) {
            throw new ApiError(401, "User no longer exists");
        }

        return this.toAuthUser(result.rows[0]);
    }
}

export default AuthService;
