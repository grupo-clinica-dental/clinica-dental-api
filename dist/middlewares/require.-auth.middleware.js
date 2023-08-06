"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // debe ir en los headers de la solicitud
    if (!authHeader)
        return res.status(401).json({
            message: "Unathorized",
        });
    const token = authHeader.split(" ")[1];
    console.log(`{AUTH MIDDLEWARE}`, token);
    // headers AUTHORIZATION = 'Bearer laksfhjasklfa564'
    if (!token)
        return res.status(401).json({
            message: "Unathorized",
        });
    // si solo viene el bearer sin el token no pasara
    jsonwebtoken_1.default.verify(token, "secret", (err, user) => {
        if (err)
            return res.status(401).json({
                message: "Unathorized",
            });
        console.log(`[AUTH-MIDDLEWARE]`, user);
        req.user = user;
        next();
    });
};
exports.requireAuth = requireAuth;
