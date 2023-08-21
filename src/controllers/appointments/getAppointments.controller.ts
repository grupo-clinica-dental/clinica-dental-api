import { NextFunction, Request, Response } from "express";
import { getNewResponseApi } from "../../libs/create-new-api-response";

import pool from "../../database"; // Importa tu configuración de base de datos
import { ROLES } from "../../constants/roles";

export const getAppointmentsHandler = async (req: Request, res: Response) => {
  const response = getNewResponseApi();

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

    const getMensajesQuery = `
      SELECT 
        cm.cita_id,
        tm.tipo,
        cm.fecha_programada,
        em.nombre AS estado_mensaje_nombre
      FROM tbl_citas_mensajes cm
      JOIN tbl_tipos_mensajes tm ON cm.tipo_mensaje_id = tm.id
      JOIN tbl_estados_mensajes em ON cm.id_estado_mensaje = em.id
      WHERE cm.cita_id = ANY($1)
    `;

    const citaIds = citasResult.rows.map((cita) => cita.id);
    const mensajesResult = await pool.query(getMensajesQuery, [citaIds]);

    // Asociamos los mensajes a sus citas correspondientes
    const appointments = citasResult.rows.map((cita) => {
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

      cita.mensajes = mensajesResult.rows.filter(
        (mensaje) => mensaje.cita_id === cita.id
      );
      return cita;
    });

    return res.status(200).json({ ...response, data: appointments });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Hubo un error al obtener las citas" });
  }
};
