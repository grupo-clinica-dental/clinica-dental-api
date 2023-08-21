import { NextFunction, Request, Response } from "express";
import { getNewResponseApi } from "../../libs/create-new-api-response";
import pool from "../../database";

export const getAllSpecialties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    const result = await pool.query("SELECT * FROM tbl_especialidades");

    if (result.rows.length === 0) {
      return res.status(404).json({
        ...response,
        message: "No se encontraron especialidades.",
      });
    }

    return res.status(200).json({
      ...response,
      data: result.rows,
      message: "Especialidades obtenidas con éxito.",
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      message: "Error al obtener las especialidades.",
      errors: [error],
    });
  }
};
