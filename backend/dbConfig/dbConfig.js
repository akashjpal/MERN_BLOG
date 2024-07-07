import mysql from "mysql2/promise";

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "blogs",
  password: "root",
});
