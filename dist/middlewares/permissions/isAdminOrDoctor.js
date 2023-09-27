"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminOrDoctor = void 0;
const create_new_api_response_1 = require("@/libs/create-new-api-response");
const roles_1 = require("@/constants/roles");
const isAdminOrDoctor = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    const validRoles = [roles_1.ROLES.DOCTOR, roles_1.ROLES.ADMIN];
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                ...response,
                message: "No se pudo encontrar un usuario en la solicitud",
            });
        }
        if (validRoles.includes(user.rol.name)) {
            next();
            return;
        }
        return res.status(403).json({
            ...response,
            message: "No tiene permisos de administrador ni de doctor",
        });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Ha ocurrido un error en el lado del servidor",
            errors: [error],
        });
    }
};
exports.isAdminOrDoctor = isAdminOrDoctor;
