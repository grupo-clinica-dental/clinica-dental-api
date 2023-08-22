import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../../libs/create-new-api-response";
import pool from "../../../database";

export const deleteType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const typeId = req.params.id;

  try {
    const deleteQuery = `
      UPDATE tbl_tipos_mensajes
      SET estado = FALSE
      WHERE id = $1
      RETURNING id, tipo
    `;

    const deletedType = await pool.query(deleteQuery, [typeId]);

    if (deletedType.rowCount === 0) {
      return res.status(404).json({
        ...response,
        message: "Tipo de mensaje no encontrado.",
      });
    }

    return res.status(200).json({
      ...response,
      succeded: true,
      message: "Tipo de mensaje eliminado exitosamente.",
      data: deletedType.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al eliminar el tipo de mensaje.",
      errors: [error],
    });
  }
};
