import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../libs/create-new-api-response";

export const updatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  // Obteniendo el ID desde los parámetros de la ruta
  const { id } = req.params;

  try {
    const verifyQuery =
      "SELECT * FROM tbl_pacientes WHERE id = $1 AND estado = TRUE";
    const verifyResult = await pool.query(verifyQuery, [id]);

    if (verifyResult.rowCount === 0) {
      return res.status(404).json({
        ...response,
        message: "Paciente no encontrado.",
      });
    }

    const updateQuery = `
      UPDATE tbl_pacientes 
      SET nombre = COALESCE($1, nombre),
          telefono = COALESCE($2, telefono),
          email = COALESCE($3, email),
          fecha_nacimiento = COALESCE($4, fecha_nacimiento)
      WHERE id = $5
    `;
    await pool.query(updateQuery, [
      req.body.nombre,
      req.body.telefono,
      req.body.email,
      req.body.fecha_nacimiento,
      id,
    ]);

    return res.status(200).json({
      ...response,
      succeded: true,
      message: "Paciente actualizado exitosamente.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al actualizar el paciente.",
      errors: [error],
    });
  }
};
