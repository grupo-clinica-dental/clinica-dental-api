import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../../libs/create-new-api-response";

export const deleteAppointmentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    const statusId = req.params.id;

    if (!statusId) {
      return res.status(400).json({
        ...response,
        message: "Por favor indique el ID del estado de cita.",
      });
    }

    // Primero, verifica si el estado de cita existe
    const verificationResult = await pool.query(
      "SELECT * FROM tbl_estados_cita WHERE id = $1",
      [statusId]
    );

    if (verificationResult.rows.length === 0) {
      return res.status(404).json({
        ...response,
        message: "Estado de cita no encontrado.",
      });
    }

    // Realizar la eliminación lógica
    await pool.query(
      "UPDATE tbl_estados_cita SET estado = false, fecha_borrado = NOW() WHERE id = $1",
      [statusId]
    );

    const statusName = verificationResult.rows[0].nombre;

    return res.status(200).json({
      ...response,
      message: `Estado de cita '${statusName}' eliminado con éxito.`,
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      message: "Error al eliminar el estado de cita.",
      errors: [error],
    });
  }
};
