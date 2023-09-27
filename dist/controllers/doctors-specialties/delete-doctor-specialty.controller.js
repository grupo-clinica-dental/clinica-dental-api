"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpecialty = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const deleteSpecialty = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    try {
        const specialtyId = req.params.id;
        if (!specialtyId) {
            return res.status(400).json({
                ...response,
                message: "Por favor indique el ID de la especialidad.",
            });
        }
        // Primero, verifica si existe la especialidad
        const verificationResult = await pool.query("SELECT * FROM tbl_especialidades WHERE id = $1", [specialtyId]);
        if (verificationResult.rows.length === 0) {
            return res.status(404).json({
                ...response,
                message: "Especialidad no encontrada.",
            });
        }
        // Realizar la eliminación lógica
        await pool.query("UPDATE tbl_especialidades SET estado = false WHERE id = $1", [specialtyId]);
        const specialtyName = verificationResult.rows[0].nombre;
        // Realizar la eliminación lógica
        await pool.query("UPDATE tbl_especialidades SET estado = false WHERE id = $1", [specialtyId]);
        return res.status(200).json({
            ...response,
            message: `Especialidad '${specialtyName}' eliminada con éxito.`,
        });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Error al eliminar la especialidad.",
            errors: [error],
        });
    }
};
exports.deleteSpecialty = deleteSpecialty;
