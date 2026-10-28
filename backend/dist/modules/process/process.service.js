import pool from "../../config/mysql.js";
export const getAllIssuesLogs = async (page, limit) => {
    const [rows] = await pool.query(`SELECT issue_id, status, created_at FROM issue_status_logs ORDER BY issue_id, created_at LIMIT ${limit} OFFSET ${page}`);
    return rows;
};
//# sourceMappingURL=process.service.js.map