import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../../libs/create-new-api-response";

export const deleteTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();
  const { id } = req.params;

  // Validación del ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({
      ...response,
      succeded: false,
      message: "El ID del template es requerido y debe ser un número válido.",
    });
  }

  try {
    // Marcamos el template como borrado en la base de datos
    const deleteQuery = `
        UPDATE tbl_mensajes_templates 
        SET estado = FALSE, fecha_borrado = CURRENT_TIMESTAMP
        WHERE id = $1 AND estado = TRUE
        RETURNING id
      `;
    const deletedTemplate = await pool.query(deleteQuery, [id]);

    if (deletedTemplate.rowCount === 0) {
      return res.status(404).json({
        ...response,
        succeded: false,
        message: "No se encontró el template o ya estaba borrado.",
      });
    }

    return res.status(200).json({
      ...response,
      succeded: true,
      message: "Template borrado exitosamente.",
      data: deletedTemplate.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al borrar el template.",
      errors: [error],
    });
  }
};
