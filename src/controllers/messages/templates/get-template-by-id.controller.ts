import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../../libs/create-new-api-response";

export const getTemplateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({
      ...response,
      succeded: false,
      message: "El ID proporcionado no es válido.",
    });
  }

  try {
    const query =
      "SELECT * FROM tbl_mensajes_templates WHERE id = $1 AND estado = TRUE";
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        ...response,
        succeded: false,
        message: "No se encontró el template con el ID especificado.",
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
      message: "Error al obtener el template.",
      errors: [error],
    });
  }
};
