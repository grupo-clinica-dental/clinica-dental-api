import { NextFunction, Request, Response } from "express";
import { getNewResponseApi } from "../../libs/create-new-api-response";
import pool from "../../database";

export const createAppointmentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      ...response,
      message: "Por favor enviar un cuerpo en la solicitud.",
    });
  }

  try {
    // Extracción de datos del cuerpo de la solicitud
    const {
      doctor_id,
      paciente_id,
      fecha_inicio,
      fecha_final,
      estado_id,
      google_calendar_event_id,
      ubicacion,
      descripcion,
      notas,
      mensajes, // <-- Aquí se extraen los mensajes
    } = req.body;

    if (mensajes.length <= 0) {
      return res
        .status(400)
        .json({ ...response, message: "Debe crear una cita con mensajes" });
    }

    if (!doctor_id || !paciente_id || !fecha_inicio || !fecha_final) {
      response.message = "Datos de cita incompletos.";
      return res.status(400).json(response);
    }

    const result = await pool.query(
      `
          INSERT INTO tbl_citas (fecha_creacion, doctor_id, paciente_id, fecha_inicio, fecha_final, estado_id, google_calendar_event_id, ubicacion, descripcion, notas)
          VALUES (CURRENT_TIMESTAMP, $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id
        `,
      [
        doctor_id,
        paciente_id,
        fecha_inicio,
        fecha_final,
        estado_id,
        google_calendar_event_id,
        ubicacion,
        descripcion,
        notas,
      ]
    );

    const citaId = result.rows[0].id;

    // Si hay mensajes, insertarlos en la base de datos
    if (mensajes && mensajes.length) {
      for (let mensaje of mensajes) {
        await pool.query(
          `
            INSERT INTO tbl_citas_mensajes (cita_id, tipo, fecha_programada, estado)
            VALUES ($1, $2, $3, 1)
          `,
          [citaId, mensaje.tipo, mensaje.fecha_programada]
        );
      }
    }

    return res.status(201).json({
      ...response,
      message: "Cita y mensajes creados con éxito.",
      success: true,
      data: { id: citaId },
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      message: "Error al crear la cita y/o mensajes.",
      errors: [error],
    });
  }
};
