import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "jira_clone",
    password: "postgres123",
    port: 5432,
});
export default pool;
//# sourceMappingURL=db.js.map