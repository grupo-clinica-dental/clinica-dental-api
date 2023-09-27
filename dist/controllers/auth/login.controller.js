"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = void 0;
const user_model_1 = require("@models/users/user.model");
const create_new_api_response_1 = require("@/libs/create-new-api-response");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginHandler = async (req, res) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    try {
        const { email, password } = req.body;
        const userToFind = await user_model_1.User.findOne({
            attributes: ["id", "email", "name", "phone", "status", "password"],
            where: {
                email,
            },
            include: ["role"],
        });
        if (!userToFind) {
            return res.status(404).json({
                message: "Credenciales incorrectas",
            });
        }
        const validPassword = await bcrypt_1.default.compare(password, userToFind.password);
        if (!validPassword) {
            return res.status(404).json({
                message: "Credenciales incorrectas",
            });
        }
        const tokenPayload = {
            id: userToFind?.id,
            email: userToFind?.email,
            nombre: userToFind?.name,
            telefono: userToFind?.phone,
            estado: userToFind?.status,
            rol: userToFind?.role,
        };
        const TOKENSECRET = process.env.TOKEN_SECRET || "secret";
        const token = jsonwebtoken_1.default.sign(tokenPayload, TOKENSECRET, {
            expiresIn: "8h",
        });
        return res.status(200).json({
            message: "Usuario Autenticado con exito",
            data: {
                token,
                profile: tokenPayload,
            },
            succeded: true,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Problema en el autenticar en el lado del servidor",
        });
    }
};
exports.loginHandler = loginHandler;
