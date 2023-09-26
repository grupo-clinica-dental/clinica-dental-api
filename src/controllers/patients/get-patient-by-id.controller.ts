import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../libs/create-new-api-response";

export const getPatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  // Obteniendo el ID desde los parámetros de la ruta
  const { id } = req.params;

  // Validamos si el ID es un número válido
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({
      ...response,
      message: "ID de paciente no válido.",
    });
  }

  try {
    const query = "SELECT * FROM tbl_pacientes WHERE id = $1 AND estado = TRUE";
    const result = await pool.query(query, [id]);

    // Si el paciente no se encuentra
    if (result.rowCount === 0) {
      return res.status(404).json({
        ...response,
        message: "Paciente no encontrado.",
      });
    }

    return res.status(200).json({
      ...response,
      succeded: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al obtener el paciente por ID.",
      errors: [error],
    });
  }
};
