import dotenv from "dotenv";

dotenv.config();

interface ConfigInterface {
  user: string;
  password: string;
  host: string;
  port: number | undefined;
  database: string;
}

export const DB_CONFIG: ConfigInterface = {
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  host: process.env.DB_HOST || "",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  database: process.env.DB_DATABASE || "",
};

export const CORS_VALID_ORIGIN =
  process.env.VALID_ORIGIN || "http://localhost:5173";

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4500;
