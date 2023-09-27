"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctorById = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
// Función para obtener un doctor por su ID
const getDoctorById = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)(); // Supongo que estás usando esta función para estandarizar respuestas.
    try {
        const doctorId = req.params.id;
        if (!doctorId) {
            return res.status(400).json({
                ...response,
                message: "Por favor indique el doctor que desea obtener.",
            });
        }
        const getDoctorQuery = `
      SELECT 
        d.id AS doctor_id, 
        u.nombre AS doctor_nombre,
        u.email AS doctor_email,
        c.id AS color_id,
        c.codigo AS doctor_color
      FROM tbl_doctores d
      JOIN tbl_usuarios u ON d.usuario_id = u.id
      JOIN tbl_colores c ON d.id_color = c.id
      WHERE d.id = $1
    `;
        // const doctorResult = await pool.query(getDoctorQuery, [doctorId]);
        // const row = doctorResult.rows[0];
        // if (!row) {
        //   response.message = "Doctor no encontrado.";
        //   return res.status(404).json(response);
        // }
        // const doctor = {
        //   id: row.doctor_id,
        //   nombre: row.doctor_nombre,
        //   email: row.doctor_email,
        //   color: {
        //     id: row.color_id,
        //     codigo: row.doctor_color,
        //   },
        // };
        return res.status(200).json({
            ...response,
            succeded: true,
            // data: doctor,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ...response,
            message: "Error al obtener el doctor.",
            errors: [error],
        });
    }
};
exports.getDoctorById = getDoctorById;
