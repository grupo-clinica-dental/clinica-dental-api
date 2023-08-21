import { Request, Response, NextFunction } from "express";
import pool from "../../database";
import { getNewResponseApi } from "../../libs/create-new-api-response";

export const getAllDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    const getDoctorsQuery = `
        SELECT 
          d.id AS doctor_id, 
          u.nombre AS doctor_nombre,
          u.email AS doctor_email,
          c.id AS color_id,
          c.codigo AS doctor_color
        FROM tbl_doctores d
        JOIN tbl_usuarios u ON d.usuario_id = u.id
        JOIN tbl_colores c ON d.id_color = c.id
      `;

    const doctorsResult = await pool.query(getDoctorsQuery);

    for (const doctor of doctorsResult.rows) {
      const getEspecialidadesQuery = `
          SELECT e.id, e.nombre
          FROM tbl_doctor_especialidades de
          JOIN tbl_especialidades e ON de.especialidad_id = e.id
          WHERE de.doctor_id = $1
        `;

      const especialidadesResult = await pool.query(getEspecialidadesQuery, [
        doctor.doctor_id,
      ]);
      doctor.especialidades = especialidadesResult.rows;
    }

    const doctors = doctorsResult.rows.map((row) => ({
      id: row.doctor_id,
      nombre: row.doctor_nombre,
      email: row.doctor_email,
      color: {
        id: row.color_id,
        codigo: row.doctor_color,
      },
      especialidades: row.especialidades,
    }));

    return res.status(200).json({
      ...response,
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al obtener los doctores.",
      errors: [error],
    });
  }
};
