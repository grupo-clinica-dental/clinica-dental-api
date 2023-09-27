"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAppointmentStatuses = void 0;
const create_new_api_response_1 = require("../../../libs/create-new-api-response");
const getAllAppointmentStatuses = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    try {
        const result = await pool.query(`
        SELECT id, nombre 
        FROM tbl_estados_cita 
      `);
        return res.status(200).json({
            ...response,
            message: "Estados de citas obtenidos con éxito.",
            data: result.rows,
        });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Error al obtener los estados de citas.",
            errors: [error],
        });
    }
};
exports.getAllAppointmentStatuses = getAllAppointmentStatuses;
