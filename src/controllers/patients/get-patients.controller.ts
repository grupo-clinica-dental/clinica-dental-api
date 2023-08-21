import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../libs/create-new-api-response";
import pool from "../../database";

export const getAllPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    const query = "SELECT * FROM tbl_pacientes WHERE estado = TRUE";
    const result = await pool.query(query);

    if (result.rowCount === 0) {
      return res.status(404).json({
        ...response,
        message: "No se encontraron pacientes.",
      });
    }

    return res.status(200).json({
      ...response,
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al obtener los pacientes.",
      errors: [error],
    });
  }
};
