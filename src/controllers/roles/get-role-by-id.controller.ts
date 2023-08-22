import { NextFunction, Request, Response } from "express";
import pool from "../../database";
import { getNewResponseApi } from "../../libs/create-new-api-response";

export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const roleId = req.params.id;

  if (!roleId) {
    return res.status(400).json({
      ...response,
      message: "Por favor indique el role que desea obtener.",
    });
  }

  try {
    const query = `
        SELECT * 
        FROM tbl_roles 
        WHERE id = $1 AND estado = TRUE
      `;
    const result = await pool.query(query, [roleId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        ...response,
        message: "Role no encontrado.",
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
      message: "Error al obtener el role.",
      errors: [error],
    });
  }
};
