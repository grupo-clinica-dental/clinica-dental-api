"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPatients = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const getAllPatients = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    try {
        const query = "SELECT * FROM tbl_pacientes WHERE estado = TRUE";
        const result = await pool.query(query);
        if (result.rowCount === 0) {
            return res.status(404).json({
                ...response,
                message: "No se encontraron pacientes.",
            });
        }
        return res.status(200).json({
            ...response,
            succeded: true,
            data: result.rows,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ...response,
            message: "Error al obtener los pacientes.",
            errors: [error],
        });
    }
};
exports.getAllPatients = getAllPatients;
