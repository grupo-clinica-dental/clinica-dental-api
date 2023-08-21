import { NextFunction, Request, Response } from "express";
import { getNewResponseApi } from "../../libs/create-new-api-response";
import pool from "../../database";

export const getSpecialtyById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    const specialtyId = req.params.id;

    if (!specialtyId) {
      return res.status(400).json({
        ...response,
        message: "Por favor indique el ID de la especialidad.",
      });
    }

    const result = await pool.query(
      "SELECT * FROM tbl_especialidades WHERE id = $1",
      [specialtyId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        ...response,
        message: "Especialidad no encontrada.",
      });
    }

    return res.status(200).json({
      ...response,
      data: result.rows[0],
      message: "Especialidad obtenida con éxito.",
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      message: "Error al obtener la especialidad.",
      errors: [error],
    });
  }
};
