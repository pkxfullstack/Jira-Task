import { ApiError } from "../../shared/utils/ApiError.js";
import type { LoginInput } from "./auth.validation.js";
import type { RegisterData } from "./auth.types.js";
import pool from "../../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthService {
    async register(data: RegisterData) {
        const { name, email, password, phone } = data;
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
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
            "SELECT * FROM users WHERE email = $1",
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
            { id: user.id, email: user.email, name: user.name, image: user.profile_image },
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
        );

        const { password: _, ...safeUser } = user;
        return {
            token,
            user: safeUser,
        };
    }

    async getMe(user: RegisterData) {
        return user;
    }
}

export default AuthService;