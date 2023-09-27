"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = void 0;
const init_models_1 = require("@/models/init-models");
const create_new_api_response_1 = require("@/libs/create-new-api-response");
const deleteRole = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    const roleId = req.params.id;
    try {
        if (!roleId) {
            return res.status(400).json({
                ...response,
                message: "El ID del rol es requerido.",
            });
        }
        const roleExists = await init_models_1.Rol.findOne({
            where: {
                id: roleId,
            },
        });
        if (roleExists) {
            return res.status(404).json({
                ...response,
                message: "Rol no encontrado o ya ha sido eliminado.",
            });
        }
        await init_models_1.Rol.update({
            status: false,
        }, {
            where: {
                id: roleId,
            },
        });
        return res.status(200).json({
            ...response,
            succeded: true,
            message: "Rol eliminado exitosamente.",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ...response,
            message: "Error al eliminar el rol.",
        });
    }
};
exports.deleteRole = deleteRole;
