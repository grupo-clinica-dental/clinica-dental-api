"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRoles = void 0;
const init_models_1 = require("@/models/init-models");
const create_new_api_response_1 = require("@/libs/create-new-api-response");
const getAllRoles = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    try {
        const roles = await init_models_1.Rol.findAll({
            where: {
                status: true,
            },
        });
        if (!roles) {
            return res.status(404).json({
                ...response,
                message: "No se encontraron roles.",
                data: [],
            });
        }
        return res.status(200).json({
            ...response,
            succeded: true,
            data: roles,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ...response,
            message: "Error al obtener roles.",
            errors: [error],
        });
    }
};
exports.getAllRoles = getAllRoles;
