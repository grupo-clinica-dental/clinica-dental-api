"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTypes = void 0;
const create_new_api_response_1 = require("../../../libs/create-new-api-response");
const getAllTypes = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    try {
        const query = "SELECT * FROM tbl_tipos_mensajes WHERE estado = TRUE";
        // const result = await pool.query(query);
        return res.status(200).json({
            ...response,
            succeded: true,
            // data: result.rows,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ...response,
            succeded: false,
            message: "Error al obtener los tipos de mensajes.",
            errors: [error],
        });
    }
};
exports.getAllTypes = getAllTypes;
