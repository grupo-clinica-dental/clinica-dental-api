"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDoctor = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const updateDoctor = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    try {
        const doctorId = req.params.id;
        const { nombre, id_color } = req.body;
        if (!doctorId) {
            return res.status(400).json({
                ...response,
                message: "Por favor indique el doctor que desea actualizar.",
            });
        }
        if (!nombre && !id_color) {
            return res.status(400).json({
                ...response,
                message: "Por favor proporcione al menos un campo para actualizar.",
            });
        }
        const updateQuery = `
      UPDATE tbl_doctores 
      SET nombre = COALESCE($1, nombre),
          id_color = COALESCE($2, id_color)
      WHERE id = $3
    `;
        // await pool.query(updateQuery, [nombre, id_color, doctorId]);
        return res.status(200).json({
            ...response,
            succeded: true,
            message: "Doctor actualizado con éxito.",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ...response,
            message: "Error al actualizar el doctor.",
            errors: [error],
        });
    }
};
exports.updateDoctor = updateDoctor;
