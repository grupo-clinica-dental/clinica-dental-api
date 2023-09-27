"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const deleteUser = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    // Comprobamos que el ID esté presente en los parámetros
    console.log(req.params.id);
    if (!req.params.id) {
        return res.status(400).json({
            ...response,
            message: "Por favor, proporciona el ID del usuario.",
        });
    }
    const userId = req.params.id;
    try {
        // Primero, verifiquemos que el usuario exista
        const userCheck = await pool.query("SELECT id FROM tbl_usuarios WHERE id = $1", [userId]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({
                ...response,
                message: "Usuario no encontrado.",
            });
        }
        // Realizar eliminación lógica
        const query = "UPDATE tbl_usuarios SET estado = false WHERE id = $1";
        await pool.query(query, [userId]);
        return res.status(200).json({
            ...response,
            message: "Usuario eliminado con éxito.",
        });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Error al eliminar el usuario.",
            errors: [error],
        });
    }
};
exports.deleteUser = deleteUser;
