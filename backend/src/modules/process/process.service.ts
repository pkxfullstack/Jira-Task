import type { IssueLogRow } from "./process.types.js";
import pool from "../../config/mysql.js";

export const getAllIssuesLogs = async (page: number, limit: number) => {
    const [rows] = await pool.query<IssueLogRow[]>(`SELECT issue_id, status, created_at FROM issue_status_logs ORDER BY issue_id, created_at LIMIT ${limit} OFFSET ${page}`);
    return rows;
};
