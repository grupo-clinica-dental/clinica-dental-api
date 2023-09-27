"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rescheduleAppointment = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const rescheduleAppointment = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    try {
        const appointmentId = req.params.id;
        if (!appointmentId) {
            return res.status(400).json({
                ...response,
                message: "Por favor indique la cita que desea reagendar.",
            });
        }
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                ...response,
                message: "Por favor enviar un cuerpo en la solicitud.",
            });
        }
        const { fecha_inicio, fecha_final } = req.body;
        if (!fecha_inicio || !fecha_final) {
            return res.status(400).json({
                ...response,
                message: "Por favor, proporciona las nuevas fechas para reagendar.",
            });
        }
        // Consultar si la cita existe antes de reagendar
        const existingAppointment = await pool.query("SELECT id FROM tbl_citas WHERE id = $1", [appointmentId]);
        if (!existingAppointment.rows.length) {
            return res
                .status(404)
                .json({ ...response, message: "Cita no encontrada." });
        }
        // Reagendar la cita actualizando las fechas
        await pool.query("UPDATE tbl_citas SET fecha_inicio = $1, fecha_final = $2 WHERE id = $3", [fecha_inicio, fecha_final, appointmentId]);
        return res.status(200).json({
            ...response,
            message: "Cita reagendada con éxito.",
        });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Error al reagendar la cita.",
            errors: [error],
        });
    }
};
exports.rescheduleAppointment = rescheduleAppointment;
