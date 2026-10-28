import mysql from "mysql2/promise";
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "", // XAMPP default
    database: "qa_app",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
});
export default pool;
//# sourceMappingURL=mysql.js.map