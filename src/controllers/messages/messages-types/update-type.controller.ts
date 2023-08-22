import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../../libs/create-new-api-response";
import pool from "../../../database";

export const updateType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const typeId = req.params.id;
  const { tipo } = req.body;

  if (!tipo) {
    return res.status(400).json({
      ...response,
      message: "El tipo de mensaje es requerido.",
    });
  }

  try {
    // Verificar si existe otro tipo con el mismo nombre
    const checkTypeQuery =
      "SELECT * FROM tbl_tipos_mensajes WHERE tipo = $1 AND estado = TRUE AND id != $2";
    const checkTypeResult = await pool.query(checkTypeQuery, [tipo, typeId]);

    if (checkTypeResult.rowCount > 0) {
      return res.status(400).json({
        ...response,
        message: "Ya existe un tipo de mensaje con ese nombre.",
      });
    }

    // Actualizar el tipo en la base de datos
    const updateQuery = `
      UPDATE tbl_tipos_mensajes
      SET tipo = COALESCE($1, tipo)
      WHERE id = $2
      RETURNING id, tipo
    `;
    const updatedType = await pool.query(updateQuery, [tipo, typeId]);

    if (updatedType.rowCount === 0) {
      return res.status(404).json({
        ...response,
        message: "Tipo de mensaje no encontrado.",
      });
    }

    return res.status(200).json({
      ...response,
      succeded: true,
      message: "Tipo de mensaje actualizado exitosamente.",
      data: updatedType.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al actualizar el tipo de mensaje.",
      errors: [error],
    });
  }
};
