"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const getUserById = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    // Comprobamos que el ID esté presente en los parámetros
    if (!req.params.id) {
        return res.status(400).json({
            ...response,
            message: "Por favor, proporciona el ID del usuario.",
        });
    }
    const userId = req.params.id;
    try {
        const query = `
            SELECT u.id, u.email, u.nombre, u.telefono, u.estado, r.id as rol_id, r.nombre as rol_nombre 
            FROM tbl_usuarios u
            INNER JOIN tbl_roles r ON u.id_rol = r.id
            WHERE u.id = $1`;
        // const result = await pool.query(query, [userId]);
        // if (result.rows.length <= 0) {
        //   return res.status(404).json({
        //     ...response,
        //     message: "Usuario no encontrado.",
        //   });
        // }
        // const userRow = result.rows[0];
        // const user = {
        //   id: userRow.id,
        //   email: userRow.email,
        //   nombre: userRow.nombre,
        //   telefono: userRow.telefono,
        //   estado: userRow.estado,
        //   rol: {
        //     id: userRow.rol_id,
        //     nombre: userRow.rol_nombre,
        //   },
        // };
        return res.status(200).json({
            ...response,
            message: "Detalles del usuario obtenidos con éxito.",
            // data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Error al obtener los detalles del usuario.",
            errors: [error],
        });
    }
};
exports.getUserById = getUserById;
