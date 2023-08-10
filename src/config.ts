interface ConfigInterface {
  user: string;
  password: string;
  host: string;
  port: number | undefined;
  database: string;
}

export const config: ConfigInterface = {
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "D@ns3r190s",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  database: process.env.DB_DATABASE || "bd_de_pruebas",
};

export const CORS_VALID_ORIGIN =
  process.env.VALID_ORIGIN || "http://localhost:5173";

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4500;
