import pg from "pg";
import { DB_CONFIG } from "./config";

const pool = new pg.Pool({
  user: DB_CONFIG.user,
  password: DB_CONFIG.password,
  host: DB_CONFIG.host,
  port: DB_CONFIG.port,
  database: DB_CONFIG.database,
});

pool.on("connect", () => console.log("Db Connected"));

pool.on("error", (e) => console.log(e));

export default pool;
