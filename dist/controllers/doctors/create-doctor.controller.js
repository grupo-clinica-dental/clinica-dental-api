"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDoctor = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const createDoctor = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    try {
        const { nombre, usuario_id, id_color, especialidades } = req.body;
        // Validaciones básicas
        if (!nombre ||
            !usuario_id ||
            !id_color ||
            !especialidades ||
            !especialidades.length) {
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
        // const doctorResult = await pool.query(insertDoctorQuery, [
        //   nombre,
        //   usuario_id,
        //   id_color,
        // ]);
        // const doctorId = doctorResult.rows[0].id;
        // Asociar las especialidades al doctor
        for (const especialidadId of especialidades) {
            const insertEspecialidadQuery = `
                INSERT INTO tbl_doctor_especialidades (doctor_id, especialidad_id)
                VALUES ($1, $2);
            `;
            // await pool.query(insertEspecialidadQuery, [doctorId, especialidadId]);
        }
        return res.status(201).json({
            ...response,
            succeded: true,
            message: "Doctor creado con éxito.",
            // data: { id: doctorId },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ...response,
            message: "Error al crear el doctor.",
            errors: [error],
        });
    }
};
exports.createDoctor = createDoctor;
