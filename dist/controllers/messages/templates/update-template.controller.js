"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTemplate = void 0;
const create_new_api_response_1 = require("../../../libs/create-new-api-response");
const updateTemplate = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    const { tipo_mensaje_id, contenido } = req.body;
    const { id } = req.params;
    // Validación del ID
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            ...response,
            succeded: false,
            message: "El ID del template es requerido y debe ser un número válido.",
        });
    }
    // Validaciones básicas
    if (!tipo_mensaje_id || isNaN(Number(tipo_mensaje_id))) {
        return res.status(400).json({
            ...response,
            succeded: false,
            message: "El tipo de mensaje es requerido y debe ser un número válido.",
        });
    }
    if (!contenido || typeof contenido !== "string" || contenido.trim() === "") {
        return res.status(400).json({
            ...response,
            succeded: false,
            message: "El contenido del template es requerido.",
        });
    }
    try {
        // Actualizamos el template en la base de datos
        const updateQuery = `
        UPDATE tbl_mensajes_templates 
        SET tipo_mensaje_id = $1, contenido = $2
        WHERE id = $3 AND estado = TRUE
        RETURNING id, tipo_mensaje_id, contenido
      `;
        const updatedTemplate = await pool.query(updateQuery, [
            tipo_mensaje_id,
            contenido,
            id,
        ]);
        if (updatedTemplate.rowCount === 0) {
            return res.status(404).json({
                ...response,
                succeded: false,
                message: "No se encontró el template o ya estaba borrado.",
            });
        }
        return res.status(200).json({
            ...response,
            succeded: true,
            message: "Template actualizado exitosamente.",
            data: updatedTemplate.rows[0],
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ...response,
            message: "Error al actualizar el template.",
            errors: [error],
        });
    }
};
exports.updateTemplate = updateTemplate;
