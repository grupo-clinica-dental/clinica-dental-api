"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateById = void 0;
const create_new_api_response_1 = require("../../../libs/create-new-api-response");
const getTemplateById = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            ...response,
            succeded: false,
            message: "El ID proporcionado no es válido.",
        });
    }
    try {
        const query = "SELECT * FROM tbl_mensajes_templates WHERE id = $1 AND estado = TRUE";
        const result = await pool.query(query, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                ...response,
                succeded: false,
                message: "No se encontró el template con el ID especificado.",
            });
        }
        return res.status(200).json({
            ...response,
            succeded: true,
            data: result.rows[0],
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ...response,
            message: "Error al obtener el template.",
            errors: [error],
        });
    }
};
exports.getTemplateById = getTemplateById;
