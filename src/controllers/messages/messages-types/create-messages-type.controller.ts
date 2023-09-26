import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../../libs/create-new-api-response";

export const createType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const { tipo } = req.body;

  // Validamos que el tipo esté presente en la solicitud
  if (!tipo) {
    return res.status(400).json({
      ...response,
      message: "El tipo de mensaje es requerido.",
    });
  }

  try {
    // Verificamos si ya existe un tipo de mensaje con el mismo nombre
    const checkTypeQuery =
      "SELECT * FROM tbl_tipos_mensajes WHERE tipo = $1 AND estado = TRUE";
    const checkTypeResult = await pool.query(checkTypeQuery, [tipo]);

    if (checkTypeResult.rowCount > 0) {
      return res.status(400).json({
        ...response,
        message: "Ya existe un tipo de mensaje con ese nombre.",
      });
    }

    // Insertamos el nuevo tipo de mensaje en la base de datos
    const insertQuery = `
      INSERT INTO tbl_tipos_mensajes (tipo)
      VALUES ($1)
      RETURNING id, tipo
    `;
    const newType = await pool.query(insertQuery, [tipo]);

    return res.status(201).json({
      ...response,
      succeded: true,
      message: "Tipo de mensaje creado exitosamente.",
      data: newType.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al crear el tipo de mensaje.",
      errors: [error],
    });
  }
};
