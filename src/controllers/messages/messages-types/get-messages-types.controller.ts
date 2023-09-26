import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../../libs/create-new-api-response";

export const getAllTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    const query = "SELECT * FROM tbl_tipos_mensajes WHERE estado = TRUE";
    // const result = await pool.query(query);

    return res.status(200).json({
      ...response,
      succeded: true,
      // data: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      succeded: false,
      message: "Error al obtener los tipos de mensajes.",
      errors: [error],
    });
  }
};
