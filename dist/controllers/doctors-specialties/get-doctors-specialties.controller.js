"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSpecialties = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const getAllSpecialties = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    try {
        const result = await pool.query("SELECT * FROM tbl_especialidades");
        if (result.rows.length === 0) {
            return res.status(404).json({
                ...response,
                message: "No se encontraron especialidades.",
            });
        }
        return res.status(200).json({
            ...response,
            data: result.rows,
            message: "Especialidades obtenidas con éxito.",
        });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Error al obtener las especialidades.",
            errors: [error],
        });
    }
};
exports.getAllSpecialties = getAllSpecialties;
