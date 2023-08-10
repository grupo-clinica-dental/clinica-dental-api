import pg from "pg";
import { config } from "./config";

const pool = new pg.Pool({
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  database: config.database,
});

pool.on("connect", () => console.log("Db Connected"));

pool.on("error", (e) => console.log(e));

export default pool;
