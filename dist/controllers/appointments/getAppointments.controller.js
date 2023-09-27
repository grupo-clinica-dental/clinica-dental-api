"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentsHandler = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const getAppointmentsHandler = async (req, res) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    try {
        const getCitasQuery = `
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
    `;
        const citasResult = await pool.query(getCitasQuery);
        const appointments = citasResult.rows.map((cita) => {
            // Lógica para construir el objeto doctor
            cita.doctor = {
                id: cita.doctor_id,
                nombre: cita.doctor_nombre,
                color: {
                    id: cita.doctor_color_id,
                    codigo: cita.doctor_color_codigo,
                },
            };
            delete cita.doctor_id;
            delete cita.doctor_nombre;
            delete cita.doctor_color_id;
            delete cita.doctor_color_codigo;
            // Lógica para construir el objeto paciente
            cita.paciente = {
                id: cita.paciente_id,
                nombre: cita.paciente_nombre,
                email: cita.paciente_email,
            };
            delete cita.paciente_id;
            delete cita.paciente_nombre;
            delete cita.paciente_email;
            cita.estado = {
                id: cita.estado_id,
                nombre: cita.estado_nombre,
            };
            delete cita.estado_id;
            delete cita.estado_nombre;
            return cita;
        });
        return res.status(200).json({ ...response, data: appointments });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Hubo un error al obtener las citas" });
    }
};
exports.getAppointmentsHandler = getAppointmentsHandler;
