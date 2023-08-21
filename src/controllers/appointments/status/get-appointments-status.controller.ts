import { NextFunction, Request, Response } from "express";
import { getNewResponseApi } from "../../../libs/create-new-api-response";
import pool from "../../../database";

export const getAllAppointmentStatuses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    const result = await pool.query(
      `
        SELECT id, nombre 
        FROM tbl_estados_cita 
      `
    );

    return res.status(200).json({
      ...response,
      message: "Estados de citas obtenidos con éxito.",
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      message: "Error al obtener los estados de citas.",
      errors: [error],
    });
  }
};
