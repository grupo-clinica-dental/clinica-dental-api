import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../../libs/create-new-api-response";

export const createTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const { tipo_mensaje_id, contenido } = req.body;

  // Validaciones básicas
  if (!tipo_mensaje_id || isNaN(Number(tipo_mensaje_id))) {
    return res.status(400).json({
      ...response,
      succeded: false,
      message: "El tipo de mensaje es requerido y debe ser un número válido.",
    });
  }

  if (!contenido || typeof contenido !== "string" || contenido.trim() === "") {
    return res.status(400).json({
      ...response,
      succeded: false,
      message: "El contenido del template es requerido.",
    });
  }

  try {
    // Verificamos si ya existe un template para ese tipo de mensaje
    const checkTemplateQuery =
      "SELECT * FROM tbl_mensajes_templates WHERE tipo_mensaje_id = $1 AND estado = TRUE";
    const checkTemplateResult = await pool.query(checkTemplateQuery, [
      tipo_mensaje_id,
    ]);

    if (checkTemplateResult.rowCount > 0) {
      return res.status(400).json({
        ...response,
        succeded: false,
        message: "Ya existe un template para ese tipo de mensaje.",
      });
    }

    // Insertamos el nuevo template en la base de datos
    const insertQuery = `
      INSERT INTO tbl_mensajes_templates (tipo_mensaje_id, contenido)
      VALUES ($1, $2)
      RETURNING id, tipo_mensaje_id, contenido
    `;
    const newTemplate = await pool.query(insertQuery, [
      tipo_mensaje_id,
      contenido,
    ]);

    return res.status(201).json({
      ...response,
      succeded: true,
      message: "Template creado exitosamente.",
      data: newTemplate.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al crear el template.",
      errors: [error],
    });
  }
};
