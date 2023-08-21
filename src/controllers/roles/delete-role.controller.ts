import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../libs/create-new-api-response";
import pool from "../../database";

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const roleId = req.params.id;

  try {
    if (!roleId) {
      return res.status(400).json({
        ...response,
        message: "El ID del rol es requerido.",
      });
    }

    const query = `
      UPDATE tbl_roles
      SET estado = FALSE, fecha_borrado = CURRENT_TIMESTAMP
      WHERE id = $1 AND estado = TRUE
    `;

    const result = await pool.query(query, [roleId]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        ...response,
        message: "Rol no encontrado o ya ha sido eliminado.",
      });
    }

    return res.status(200).json({
      ...response,
      success: true,
      message: "Rol eliminado exitosamente.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al eliminar el rol.",
      errors: [error],
    });
  }
};
