"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../../database"));
const loginHandler = async (req, res) => {
    // recibimos datos procesamos el request body
    // body = {email: ???, password: ???}
    //// VALIDACIONES manuales o con librerias como express generator, zod etc
    //Store in database
    //GENERATE TOKEN
    console.log(req.body);
    try {
        const { email, password } = req.body;
        const query = "SELECT * FROM tbl_usuarios WHERE email = $1 AND password = $2";
        const values = [email, password];
        const result = await database_1.default.query(query, values);
        if (result.rows.length <= 0) {
            return res.status(401).json({ message: "Unathorized" });
        }
        const token = jsonwebtoken_1.default.sign({
            email: email,
            password: password,
        }, "secret", {
            expiresIn: 60 * 60 * 24,
        });
        return res.json({ token });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Somethin went wrong on the server side" });
    }
};
exports.loginHandler = loginHandler;
