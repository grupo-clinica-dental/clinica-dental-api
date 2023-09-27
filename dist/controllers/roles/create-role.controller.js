"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRole = void 0;
const create_new_api_response_1 = require("@/libs/create-new-api-response");
const init_models_1 = require("@/models/init-models");
const createRole = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    const { name } = req.body;
    try {
        // Validamos que el nombre del rol esté presente en la solicitud
        if (!name) {
            return res.status(400).json({
                ...response,
                message: "El nombre del rol es requerido.",
            });
        }
        // Verificamos si ya existe un rol con el mismo nombre
        const roleExists = await init_models_1.Rol.findOne({
            where: {
                name,
            },
        });
        if (roleExists) {
            return res.status(400).json({
                ...response,
                message: "Ya existe un rol con ese nombre.",
            });
        }
        const newRol = await init_models_1.Rol.create({
            name,
        });
        return res.status(201).json({
            ...response,
            succeded: true,
            message: "Rol creado exitosamente.",
            data: newRol,
        });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Error al crear el rol.",
        });
    }
};
exports.createRole = createRole;
