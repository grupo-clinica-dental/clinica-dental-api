import { Request, Response, NextFunction } from "express";
import { getNewResponseApi } from "../../libs/create-new-api-response";
import pool from "../../database";

export const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  const { nombre, telefono, email, fecha_nacimiento } = req.body;

  try {
    // Validamos que los campos requeridos estén presentes en la solicitud
    if (!nombre || !telefono || !email) {
      return res.status(400).json({
        ...response,
        message: "Los campos nombre, telefono y email son requeridos.",
      });
    }

    const checkPatientQuery =
      "SELECT * FROM tbl_pacientes WHERE email = $1 AND estado = TRUE";
    const checkPatientResult = await pool.query(checkPatientQuery, [email]);

    if (checkPatientResult.rowCount > 0) {
      return res.status(400).json({
        ...response,
        message: "Ya existe un paciente con ese email.",
      });
    }

    const insertQuery = `
      INSERT INTO tbl_pacientes (nombre, telefono, email, fecha_nacimiento)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, telefono, email, fecha_nacimiento
    `;
    const newPatient = await pool.query(insertQuery, [
      nombre,
      telefono,
      email,
      fecha_nacimiento,
    ]);

    return res.status(201).json({
      ...response,
      succeded: true,
      message: "Paciente creado exitosamente.",
      data: newPatient.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ...response,
      message: "Error al crear el paciente.",
      errors: [error],
    });
  }
};
