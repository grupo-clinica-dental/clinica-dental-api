import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../../libs/create-new-api-response";
import pool from "../../../database";

export const getTypeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const typeId = req.params.id;

  // Validamos que el ID sea proporcionado
  if (!typeId) {
    return res.status(400).json({
      ...response,
      succeded: false,
      message: "El ID del tipo de mensaje es requerido.",
    });
  }

  try {
    const query =
      "SELECT * FROM tbl_tipos_mensajes WHERE id = $1 AND estado = TRUE";
    const result = await pool.query(query, [typeId]);

    // Si no encontramos ningún tipo de mensaje con ese ID
    if (result.rowCount === 0) {
      return res.status(404).json({
        ...response,
        succeded: false,
        message: "Tipo de mensaje no encontrado.",
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
      succeded: false,
      message: "Error al obtener el tipo de mensaje.",
      errors: [error],
    });
  }
};
