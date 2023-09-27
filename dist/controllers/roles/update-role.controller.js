"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRole = void 0;
const create_new_api_response_1 = require("@/libs/create-new-api-response");
const init_models_1 = require("@/models/init-models");
const updateRole = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    const roleId = req.params.id;
    const { name } = req.body;
    try {
        if (!name || !roleId) {
            return res.status(400).json({
                ...response,
                message: "El nombre del rol y el ID son requeridos.",
            });
        }
        // Verificamos primero si el rol existe y está activo
        const rolToUpdate = await init_models_1.Rol.findOne({
            where: {
                id: roleId,
                status: true,
            },
        });
        if (!rolToUpdate) {
            return res.status(404).json({
                ...response,
                message: "Rol no encontrado o ya ha sido eliminado.",
            });
        }
        rolToUpdate.name = name;
        rolToUpdate.save();
        return res.status(200).json({
            ...response,
            succeded: true,
            message: "Rol actualizado exitosamente.",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ...response,
            message: "Error al actualizar el rol.",
            errors: [error],
        });
    }
};
exports.updateRole = updateRole;
