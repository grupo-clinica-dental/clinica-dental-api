import { Request, Response, NextFunction } from "express";
import pool from "../../database";
import { getNewResponseApi } from "../../libs/create-new-api-response";

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const { nombre } = req.body;

  try {
    // Validamos que el nombre del rol esté presente en la solicitud
    if (!nombre) {
      return res.status(400).json({
        ...response,
        message: "El nombre del rol es requerido.",
      });
    }

    // Verificamos si ya existe un rol con el mismo nombre
    const checkRoleQuery =
      "SELECT * FROM tbl_roles WHERE nombre = $1 AND estado = TRUE";
    const checkRoleResult = await pool.query(checkRoleQuery, [nombre]);

    if (checkRoleResult.rowCount > 0) {
      return res.status(400).json({
        ...response,
        message: "Ya existe un rol con ese nombre.",
      });
    }

    // Insertamos el nuevo rol en la base de datos
    const insertQuery = `
      INSERT INTO tbl_roles (nombre)
      VALUES ($1)
      RETURNING id, nombre
    `;
    const newRole = await pool.query(insertQuery, [nombre]);

    return res.status(201).json({
      ...response,
      success: true,
      message: "Rol creado exitosamente.",
      data: newRole.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al crear el rol.",
      errors: [error],
    });
  }
};
