import { NextFunction, Request, Response } from "express";
import { getNewResponseApi } from "../../../libs/create-new-api-response";

export const updateAppointmentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  const statusId = req.params.id;

  // Validación de cuerpo de la solicitud
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      ...response,
      message: "El cuerpo de la solicitud no debe estar vacío.",
    });
  }

  const { nombre, estado } = req.body;

  try {
    // Verificar si el estado de cita existe
    // const verificationResult = await pool.query(
    //   "SELECT * FROM tbl_estados_cita WHERE id = $1",
    //   [statusId]
    // );

    // if (verificationResult.rows.length === 0) {
    //   return res.status(404).json({
    //     ...response,
    //     message: "Estado de cita no encontrado.",
    //   });
    // }

    // Realizar la actualización
    // await pool.query(
    //   `
    //     UPDATE tbl_estados_cita
    //     SET nombre = COALESCE($1, nombre),
    //         estado = COALESCE($2, estado)
    //     WHERE id = $3
    //   `,
    //   [nombre, estado, statusId]
    // );

    return res.status(200).json({
      ...response,
      message: `Estado de cita '${nombre}' actualizado con éxito.`,
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      message: "Error al actualizar el estado de cita.",
      errors: [error],
    });
  }
};
