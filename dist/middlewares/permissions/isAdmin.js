"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const roles_1 = require("../../constants/roles");
const isAdmin = async (req, res, next) => {
    const response = {
        data: {},
        errors: null,
        message: "",
        succeded: false,
    };
    try {
        const user = req.user;
        if (user.rol.name === roles_1.ROLES.ADMIN) {
            next();
            return;
        }
        return res
            .status(403)
            .json({ ...response, message: "No tiene permisos para acceder" });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Ha ocurrido un error en el lado del servidor",
            errors: [error],
        });
    }
};
exports.isAdmin = isAdmin;
