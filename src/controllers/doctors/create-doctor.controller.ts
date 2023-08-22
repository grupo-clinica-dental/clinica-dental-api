import { Request, Response, NextFunction } from "express";
import pool from "../../database";
import { getNewResponseApi } from "../../libs/create-new-api-response";

export const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    const { nombre, usuario_id, id_color, especialidades } = req.body;

    // Validaciones básicas
    if (
      !nombre ||
      !usuario_id ||
      !id_color ||
      !especialidades ||
      !especialidades.length
    ) {
      return res.status(400).json({
        ...response,
        message: "Por favor proporcione todos los campos requeridos.",
      });
    }

    // Crear el nuevo doctor
    const insertDoctorQuery = `
            INSERT INTO tbl_doctores (nombre, usuario_id, id_color)
            VALUES ($1, $2, $3) RETURNING id;
        `;

    const doctorResult = await pool.query(insertDoctorQuery, [
      nombre,
      usuario_id,
      id_color,
    ]);
    const doctorId = doctorResult.rows[0].id;

    // Asociar las especialidades al doctor
    for (const especialidadId of especialidades) {
      const insertEspecialidadQuery = `
                INSERT INTO tbl_doctor_especialidades (doctor_id, especialidad_id)
                VALUES ($1, $2);
            `;

      await pool.query(insertEspecialidadQuery, [doctorId, especialidadId]);
    }

    return res.status(201).json({
      ...response,
      succeded: true,
      message: "Doctor creado con éxito.",
      data: { id: doctorId },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al crear el doctor.",
      errors: [error],
    });
  }
};
