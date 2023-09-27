"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserHandler = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const updateUserHandler = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    // Verificar si el ID del usuario se proporciona
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            ...response,
            message: "Por favor enviar un cuerpo en la solicitud.",
        });
    }
    if (!req.params.id) {
        return res.status(400).json({
            ...response,
            message: "Por favor, proporciona el ID del usuario.",
        });
    }
    const userId = req.params.id;
    const { email, nombre, telefono, id_rol } = req.body;
    try {
        // const userCheck = await pool.query(
        //   "SELECT id FROM tbl_usuarios WHERE id = $1",
        //   [userId]
        // );
        // if (userCheck.rows.length === 0) {
        //   return res.status(404).json({
        //     ...response,
        //     message: "Usuario no encontrado.",
        //   });
        // }
        // Actualizar datos del usuario
        const query = `
          UPDATE tbl_usuarios 
          SET email = COALESCE($1, email), 
              nombre = COALESCE($2, nombre),
              telefono = COALESCE($3, telefono),
              id_rol = COALESCE($4, id_rol)
          WHERE id = $5
        `;
        // await pool.query(query, [email, nombre, telefono, id_rol, userId]);
        return res.status(200).json({
            ...response,
            message: "Usuario actualizado con éxito.",
        });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Error al actualizar el usuario.",
            errors: [error],
        });
    }
};
exports.updateUserHandler = updateUserHandler;
