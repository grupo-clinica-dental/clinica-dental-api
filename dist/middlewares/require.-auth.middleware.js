"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const create_new_api_response_1 = require("@/libs/create-new-api-response");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    // debe ir en los headers de la solicitud
    // validar base de datos si el token esta activo
    if (!authHeader)
        return res.status(401).json({
            ...response,
            message: "Falta encabezado de autorización",
        });
    const token = authHeader.split(" ")[1];
    // headers AUTHORIZATION = 'Bearer laksfhjasklfa564'
    if (!token)
        return res.status(401).json({
            ...response,
            message: "Usted no esta Autorizado",
        });
    // si solo viene el bearer sin el token no pasara
    const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";
    jsonwebtoken_1.default.verify(token, TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(401).json({
                ...response,
                message: "Usted no esta autorizado",
            });
        req.user = user;
        next();
    });
};
exports.requireAuth = requireAuth;
