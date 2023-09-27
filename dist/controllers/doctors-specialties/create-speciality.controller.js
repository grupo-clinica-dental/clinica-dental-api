"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpecialty = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const createSpecialty = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
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
        // const result = await pool.query(
        //   `
        //     INSERT INTO tbl_especialidades (nombre, estado, fecha_borrado)
        //     VALUES ($1, COALESCE($2, true), ${fechaBorrado})
        //     RETURNING id, nombre
        //   `,
        //   [nombre, estado]
        // );
        // Enviar respuesta con el ID y nombre de la especialidad creada
        // const createdSpecialty = result.rows[0];
        return res.status(201).json({
            ...response,
            // message: `Especialidad '${createdSpecialty.nombre}' creada con éxito.`,
            // data: createdSpecialty,
        });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Error al crear la especialidad.",
            errors: [error],
        });
    }
};
exports.createSpecialty = createSpecialty;
