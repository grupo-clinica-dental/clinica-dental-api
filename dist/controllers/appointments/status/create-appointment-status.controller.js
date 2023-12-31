"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointmentStatus = void 0;
const create_new_api_response_1 = require("../../../libs/create-new-api-response");
const createAppointmentStatus = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            ...response,
            message: "El cuerpo de la solicitud no debe estar vacío.",
        });
    }
    try {
        const { nombre } = req.body;
        // Validar que el cuerpo tenga la información necesaria
        if (!nombre) {
            return res.status(400).json({
                ...response,
                message: "El nombre del estado es requerido.",
            });
        }
        // Consulta para insertar el nuevo estado en la base de datos
        const result = await pool.query("INSERT INTO tbl_estados_cita (nombre) VALUES ($1) RETURNING id, nombre", [nombre]);
        // Si todo va bien, retorna el estado de cita creado
        return res.status(201).json({
            ...response,
            data: result.rows[0],
            message: "Estado de cita creado con éxito.",
        });
    }
    catch (error) {
        // En caso de un error inesperado, retorna el error
        return res.status(500).json({
            ...response,
            message: "Error al crear el estado de cita.",
            errors: [error],
        });
    }
};
exports.createAppointmentStatus = createAppointmentStatus;
