import { NextFunction, Request, Response } from "express";
import { getNewResponseApi } from "../../libs/create-new-api-response";

import { ROLES } from "../../constants/roles";

export const deleteAppointmentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const appointmentId = req.params.id;
  const response = getNewResponseApi();

  if (!appointmentId) {
    return res.status(400).json({
      ...response,
      message: "Por favor indique la cita que desea obtener.",
    });
  }

  try {
    const appointmentResult = await pool.query(
      "SELECT * FROM tbl_citas WHERE id = $1",
      [appointmentId]
    );
    const appointment = appointmentResult.rows[0];

    if (!appointment) {
      return res
        .status(404)
        .json({ ...response, message: "Cita no encontrada" });
    }

    // Si el usuario es un administrador, puede eliminar la cita directamente
    if (user.rol === ROLES.ADMIN) {
      await pool.query("UPDATE tbl_citas SET estado = FALSE WHERE id = $1", [
        appointmentId,
      ]);
      return res
        .status(200)
        .json({ ...response, message: "Cita eliminada con éxito" });
    }

    // Si no es un administrador, comprobar si es un doctor y si está asociado a la cita
    const doctorResult = await pool.query(
      "SELECT id FROM tbl_doctores WHERE usuario_id = $1",
      [user.id]
    );
    const doctor = doctorResult.rows[0];

    // Si el usuario no está asociado a un doctor
    if (!doctor) {
      return res.status(403).json({
        ...response,
        message: "No tienes permiso para eliminar esta cita",
      });
    }

    // Comprobar si el doctor asociado al usuario está vinculado a la cita
    if (appointment.doctor_id !== doctor.id) {
      return res.status(403).json({
        ...response,
        message: "No tienes permiso para eliminar esta cita",
      });
    }

    // Si todo está en orden, actualiza el estado de la cita a inactivo
    await pool.query("UPDATE tbl_citas SET estado = FALSE WHERE id = $1", [
      appointmentId,
    ]);

    return res
      .status(200)
      .json({ ...response, message: "Cita eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar cita:", error);
    res
      .status(500)
      .json({ ...response, message: "Error interno del servidor" });
  }
};
