"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleById = void 0;
const init_models_1 = require("@/models/init-models");
const create_new_api_response_1 = require("@/libs/create-new-api-response");
const getRoleById = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    const roleId = req.params.id;
    if (!roleId) {
        return res.status(400).json({
            ...response,
            message: "Por favor indique el rol que desea obtener.",
        });
    }
    try {
        const fountRol = await init_models_1.Rol.findOne({
            where: {
                id: roleId,
            },
        });
        if (!fountRol) {
            return res.status(404).json({
                ...response,
                message: "Rol no encontrado o ya ha sido eliminado.",
            });
        }
        return res.status(200).json({
            ...response,
            succeded: true,
            data: fountRol,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ...response,
            message: "Error al obtener el role.",
        });
    }
};
exports.getRoleById = getRoleById;
