"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatient = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const deletePatient = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    const { id } = req.params;
    // Validamos si el ID es un número válido
    if (!Number.isInteger(Number(id))) {
        return res.status(400).json({
            ...response,
            message: "ID de paciente no válido.",
        });
    }
    try {
        const verifyQuery = "SELECT * FROM tbl_pacientes WHERE id = $1 AND estado = TRUE";
        // const verifyResult = await pool.query(verifyQuery, [id]);
        // if (verifyResult.rowCount === 0) {
        //   return res.status(404).json({
        //     ...response,
        //     message: "Paciente no encontrado.",
        //   });
        // }
        const deleteQuery = `
      UPDATE tbl_pacientes 
      SET estado = FALSE, fecha_borrado = CURRENT_TIMESTAMP
      WHERE id = $1
    `;
        // await pool.query(deleteQuery, [id]);
        return res.status(200).json({
            ...response,
            succeded: true,
            message: "Paciente eliminado exitosamente.",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ...response,
            message: "Error al eliminar el paciente.",
            errors: [error],
        });
    }
};
exports.deletePatient = deletePatient;
