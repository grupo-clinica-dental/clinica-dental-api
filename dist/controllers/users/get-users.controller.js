"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersHandler = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const getUsersHandler = async (req, res, next) => {
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    try {
        const query = `
            SELECT u.id, u.email, u.nombre, u.telefono, u.estado, r.id as rol_id, r.nombre as rol_nombre 
            FROM tbl_usuarios u
            INNER JOIN tbl_roles r ON u.id_rol = r.id`;
        // const result = await pool.query(query);
        // if (!result.rows.length) {
        //   return res.status(404).json({
        //     ...response,
        //     message: "No se encontraron usuarios.",
        //   });
        // }
        // const users = result.rows.map((user) => ({
        //   id: user.id,
        //   email: user.email,
        //   nombre: user.nombre,
        //   telefono: user.telefono,
        //   estado: user.estado,
        //   rol: {
        //     id: user.rol_id,
        //     nombre: user.rol_nombre,
        //   },
        // }));
        return res.status(200).json({
            ...response,
            message: "Lista de usuarios obtenida con éxito.",
            // data: users,
        });
    }
    catch (error) {
        return res.status(500).json({
            ...response,
            message: "Error al obtener la lista de usuarios.",
            errors: [error],
        });
    }
};
exports.getUsersHandler = getUsersHandler;
