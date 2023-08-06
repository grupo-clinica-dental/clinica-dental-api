"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.CORS_VALID_ORIGIN = exports.config = void 0;
exports.config = {
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "D@ns3r190s",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    database: process.env.DB_DATABASE || "bd_de_pruebas",
};
exports.CORS_VALID_ORIGIN = process.env.VALID_ORIGIN || "http://localhost:5173";
exports.port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
