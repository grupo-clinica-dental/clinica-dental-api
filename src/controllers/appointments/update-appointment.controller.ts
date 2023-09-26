import { NextFunction, Request, Response } from "express";
import { getNewResponseApi } from "../../libs/create-new-api-response";

export const updateAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  if (!req.params.id) {
    return res.status(400).json({
      ...response,
      message: "Por favor indique la cita que desea actualizar.",
    });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      ...response,
      message: "Por favor enviar un cuerpo en la solicitud.",
    });
  }

  const appointmentId = req.params.id;

  const {
    fecha_inicio,
    fecha_final,
    descripcion,
    notas,
    ubicacion,
    google_calendar_event_id,
  } = req.body;

  try {
    // Verificar si la cita existe
    const result = await pool.query("SELECT id FROM tbl_citas WHERE id = $1", [
      appointmentId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        ...response,
        message: "La cita especificada no existe.",
      });
    }

    // Actualizar la cita
    await pool.query(
      `
          UPDATE tbl_citas 
          SET fecha_inicio = COALESCE($1, fecha_inicio), 
              fecha_final = COALESCE($2, fecha_final), 
              descripcion = COALESCE($3, descripcion),
              notas = COALESCE($4, notas), 
              ubicacion = COALESCE($5, ubicacion),
              google_calendar_event_id = COALESCE($6, google_calendar_event_id) 
          WHERE id = $7
          `,
      [
        fecha_inicio,
        fecha_final,
        descripcion,
        notas,
        ubicacion,
        google_calendar_event_id,
        appointmentId,
      ]
    );

    return res.status(200).json({
      ...response,
      message: "Cita actualizada con éxito.",
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      message: "Error al actualizar la cita.",
      errors: [error],
    });
  }
};
