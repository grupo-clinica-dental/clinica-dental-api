import { Request, Response, NextFunction } from "express";
import pool from "../../../database";
import { getNewResponseApi } from "../../../libs/create-new-api-response";

export const getTemplateByTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    // Seleccionar todos los templates con el tipo de mensaje asociado
    const query = `
      SELECT tmt.id, tmt.contenido, ttm.tipo
      FROM tbl_mensajes_templates tmt
      INNER JOIN tbl_tipos_mensajes ttm ON tmt.tipo_mensaje_id = ttm.id
      WHERE tmt.estado = TRUE
      ORDER BY ttm.tipo
    `;

    const result = await pool.query(query);

    if (result.rowCount === 0) {
      return res.status(404).json({
        ...response,
        succeded: false,
        message: "No se encontraron templates.",
      });
    }

    // Crea un arreglo de objetos con el contenido y tipo de cada template
    const templates = result.rows.map((row) => ({
      id: row.id,
      contenido: row.contenido,
      tipo: row.tipo,
    }));

    console.log(templates);

    return res.status(200).json({
      ...response,
      succeded: true,
      data: templates,
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
