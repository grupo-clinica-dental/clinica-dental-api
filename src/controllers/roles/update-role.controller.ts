import { Request, Response, NextFunction } from "express";
import pool from "../../database";
import { getNewResponseApi } from "../../libs/create-new-api-response";

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const roleId = req.params.id;
  const { nombre } = req.body;

  try {
    if (!nombre || !roleId) {
      return res.status(400).json({
        ...response,
        message: "El nombre del rol y el ID son requeridos.",
      });
    }

    // Verificamos primero si el rol existe y está activo
    const checkRoleQuery =
      "SELECT * FROM tbl_roles WHERE id = $1 AND estado = TRUE";
    const checkRoleResult = await pool.query(checkRoleQuery, [roleId]);

    if (checkRoleResult.rowCount === 0) {
      return res.status(404).json({
        ...response,
        message: "Rol no encontrado.",
      });
    }

    // Actualizamos el rol
    const updateQuery = `
      UPDATE tbl_roles
      SET nombre = $1
      WHERE id = $2
    `;
    await pool.query(updateQuery, [nombre, roleId]);

    return res.status(200).json({
      ...response,
      succeded: true,
      message: "Rol actualizado exitosamente.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al actualizar el rol.",
      errors: [error],
    });
  }
};
