import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../../libs/create-new-api-response";

export const getAppointmentStatusById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    const statusId = req.params.id;

    // Si el ID no está presente, retorna un error
    if (!statusId) {
      return res.status(400).json({
        ...response,
        message: "Por favor indique el ID del estado de cita.",
      });
    }

    // Consulta para obtener el estado de cita por su ID
    // const result = await pool.query(
    //   "SELECT id, nombre FROM tbl_estados_cita WHERE id = $1 AND estado = TRUE",
    //   [statusId]
    // );

    // Si no se encuentra el estado, retorna un error
    // if (result.rows.length === 0) {
    //   return res.status(404).json({
    //     ...response,
    //     message: "Estado de cita no encontrado.",
    //   });
    // }

    // Si todo va bien, retorna el estado de cita
    return res.status(200).json({
      ...response,
      // data: result.rows[0],
      message: "Estado de cita obtenido con éxito.",
    });
  } catch (error) {
    // En caso de un error inesperado, retorna el error
    return res.status(500).json({
      ...response,
      message: "Error al obtener el estado de cita.",
      errors: [error],
    });
  }
};
