import { Request, Response, NextFunction } from "express";
import pool from "../../../database";
import { getNewResponseApi } from "../../../libs/create-new-api-response";

export const getAllTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    const query = "SELECT * FROM tbl_mensajes_templates WHERE estado = TRUE";
    const result = await pool.query(query);

    if (result.rowCount === 0) {
      return res.status(404).json({
        ...response,
        succeded: false,
        message: "No se encontraron templates.",
      });
    }

    return res.status(200).json({
      ...response,
      succeded: true,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al obtener los templates.",
      errors: [error],
    });
  }
};
