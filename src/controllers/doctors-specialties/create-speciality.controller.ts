import { NextFunction, Request, Response } from "express";
import { getNewResponseApi } from "../../libs/create-new-api-response";
import pool from "../../database";

export const createSpecialty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = getNewResponseApi();

  try {
    // Verificación de campos requeridos en el body
    const { nombre, estado } = req.body;

    if (!nombre) {
      return res.status(400).json({
        ...response,
        message: "Por favor, proporcione un nombre para la especialidad.",
      });
    }

    // Fecha de borrado solo si el estado es false
    const fechaBorrado = estado === false ? "NOW()" : null;

    // Insertar la nueva especialidad en la base de datos
    const result = await pool.query(
      `
        INSERT INTO tbl_especialidades (nombre, estado, fecha_borrado) 
        VALUES ($1, COALESCE($2, true), ${fechaBorrado})
        RETURNING id, nombre
      `,
      [nombre, estado]
    );

    // Enviar respuesta con el ID y nombre de la especialidad creada
    const createdSpecialty = result.rows[0];

    return res.status(201).json({
      ...response,
      message: `Especialidad '${createdSpecialty.nombre}' creada con éxito.`,
      data: createdSpecialty,
    });
  } catch (error) {
    return res.status(500).json({
      ...response,
      message: "Error al crear la especialidad.",
      errors: [error],
    });
  }
};
