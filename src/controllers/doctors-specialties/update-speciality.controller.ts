import { NextFunction, Request, Response } from "express";
import { getNewResponseApi } from "../../libs/create-new-api-response";

export const updateSpeciality = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    const specialityId = req.params.id;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        ...response,
        message: "Por favor, envíe un cuerpo en la solicitud.",
      });
    }

    // Verificar si la especialidad existe
    const verificationResult = await pool.query(
      "SELECT * FROM tbl_especialidades WHERE id = $1",
      [specialityId]
    );

    if (verificationResult.rows.length === 0) {
      return res.status(404).json({
        ...response,
        message: "Especialidad no encontrada.",
      });
    }

    // Extraer los datos del cuerpo
    const { nombre, estado } = req.body;

    // Realizar la actualización
    await pool.query(
      `
        UPDATE tbl_especialidades 
        SET nombre = COALESCE($1, nombre), 
            estado = COALESCE($2, estado)
        WHERE id = $3
      `,
      [nombre, estado, specialityId]
    );

    return res.status(200).json({
      ...response,
      message: `Especialidad '${nombre}' actualizada con éxito.`,
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      message: "Error al actualizar la especialidad.",
      errors: [error],
    });
  }
};
