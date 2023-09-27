"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.CORS_VALID_ORIGIN = exports.sequelizeDbOptions = void 0;
const sequelize_1 = require("sequelize");
exports.sequelizeDbOptions = {
    dialect: "postgres",
    host: process.env.DB_HOST ?? "localhost",
    username: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "D@ns3r190s",
    database: process.env.DB_DATABASE ?? "test",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
};
const sequelize = new sequelize_1.Sequelize(exports.sequelizeDbOptions);
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.CORS_VALID_ORIGIN = process.env.VALID_ORIGIN || "http://localhost:5173";
exports.PORT = process.env.PORT ? parseInt(process.env.PORT) : 4500;
exports.default = sequelize;
