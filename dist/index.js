"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_1 = __importDefault(require("./routes/test"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const apiVersion = "/api/v1";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: config_1.CORS_VALID_ORIGIN,
    credentials: true,
}));
app.use(apiVersion, test_1.default);
app.use(apiVersion, auth_routes_1.default);
const port = 4500;
app.listen(port, () => {
    console.log(`started development server: http://localhost:${port}/api/v1`);
});
