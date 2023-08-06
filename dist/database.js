"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const config_1 = require("./config");
const pool = new pg_1.default.Pool({
    user: config_1.config.user,
    password: config_1.config.password,
    host: config_1.config.host,
    port: config_1.config.port,
    database: config_1.config.database,
});
pool.on("connect", () => console.log("Db Connected"));
exports.default = pool;
