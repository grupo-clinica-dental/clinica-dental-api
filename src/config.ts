import { Options, Sequelize } from "sequelize";

export const sequelizeDbOptions: Options = {
  dialect: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  username: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "D@ns3r190s",
  database: process.env.DB_DATABASE ?? "test",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
};

const sequelize = new Sequelize(sequelizeDbOptions);

import dotenv from "dotenv";

dotenv.config();

export const CORS_VALID_ORIGIN =
  process.env.VALID_ORIGIN || "http://localhost:5173";

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4500;

export default sequelize;
