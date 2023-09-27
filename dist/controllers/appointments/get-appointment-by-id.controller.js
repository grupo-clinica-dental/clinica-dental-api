"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentById = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const getAppointmentById = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    try {
        const appointmentId = req.params.id;
        if (!appointmentId) {
            return res.status(400).json({
                ...response,
                message: "Por favor indique la cita que desea obtener.",
            });
        }
        const getCitaQuery = `
      SELECT 
        c.id, 
        c.fecha_creacion,
        c.fecha_inicio, 
        c.fecha_final,
        d.id AS doctor_id,
        u.nombre AS doctor_nombre,
        col.id AS doctor_color_id, 
        col.codigo AS doctor_color_codigo,
        p.id AS paciente_id,
        p.nombre AS paciente_nombre,
        p.email AS paciente_email,
        e.id AS estado_id,
        e.nombre AS estado_nombre,
        c.google_calendar_event_id,
        c.ubicacion,
        c.descripcion,
        c.notas,
        c.estado
      FROM tbl_citas c
      JOIN tbl_doctores d ON c.doctor_id = d.id
      JOIN tbl_colores col ON d.id_color = col.id
      JOIN tbl_usuarios u ON d.usuario_id = u.id
      JOIN tbl_pacientes p ON c.paciente_id = p.id
      JOIN tbl_estados_cita e ON c.estado_id = e.id
      WHERE c.id = $1
    `;
        const citaResult = await pool.query(getCitaQuery, [appointmentId]);
        const row = citaResult.rows[0];
        if (!row) {
            response.message = "Cita no encontrada.";
            return res.status(404).json(response);
        }
        // La línea para obtener los mensajes se ha eliminado o comentado
        // row.mensajes = mensajesResult.rows;
        row.doctor = {
            id: row.doctor_id,
            nombre: row.doctor_nombre,
            color: {
                id: row.doctor_color_id,
                codigo: row.doctor_color_codigo,
            },
        };
        delete row.doctor_id;
        delete row.doctor_nombre;
        delete row.doctor_color_id;
        delete row.doctor_color_codigo;
        row.paciente = {
            id: row.paciente_id,
            nombre: row.paciente_nombre,
            email: row.paciente_email,
        };
        delete row.paciente_id;
        delete row.paciente_nombre;
        delete row.paciente_email;
        row.estado = {
            id: row.estado_id,
            nombre: row.estado_nombre,
        };
        delete row.estado_id;
        delete row.estado_nombre;
        return res.status(200).json({
            ...response,
            succeded: true,
            data: row,
        });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Error al obtener la cita.",
            errors: [error],
        });
    }
};
exports.getAppointmentById = getAppointmentById;
