import { NextFunction, Request, Response } from "express";
import pool from "../../database";
import { getNewResponseApi } from "../../libs/create-new-api-response";

export const getAllRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    const query = "SELECT * FROM tbl_roles WHERE estado = TRUE";
    const result = await pool.query(query);

    return res.status(200).json({
      ...response,
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al obtener roles.",
      errors: [error],
    });
  }
};
