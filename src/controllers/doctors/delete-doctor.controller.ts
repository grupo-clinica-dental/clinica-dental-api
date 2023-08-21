import { Request, Response, NextFunction } from "express";
import pool from "../../database";
import { getNewResponseApi } from "../../libs/create-new-api-response";

export const deleteDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi(); // Supongo que estás usando esta función para estandarizar respuestas.

  try {
    const doctorId = req.params.id;

    if (!doctorId) {
      return res.status(400).json({
        ...response,
        message: "Por favor indique el doctor que desea eliminar.",
      });
    }

    const logicalDeleteQuery = `
        UPDATE tbl_doctores 
        SET estado = FALSE,
            fecha_borrado = CURRENT_TIMESTAMP 
        WHERE id = $1
      `;

    const { rowCount } = await pool.query(logicalDeleteQuery, [doctorId]);

    if (!rowCount) {
      response.message = "Doctor no encontrado.";
      return res.status(404).json(response);
    }

    return res.status(200).json({
      ...response,
      success: true,
      message: "Doctor eliminado con éxito.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al eliminar el doctor.",
      errors: [error],
    });
  }
};
