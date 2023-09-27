"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = void 0;
const createUserHandler = async (req, res, next) => {
    // const response = getNewResponseApi();
    // Validar que el cuerpo de la solicitud no esté vacío
    // if (!req.body || Object.keys(req.body).length === 0) {
    //   return res.status(400).json({
    //     ...response,
    //     message: "Por favor enviar un cuerpo en la solicitud.",
    //   });
    // }
    const { email, password, nombre, telefono, id_rol } = req.body;
    // TODO CIFRAR CONTRASEñA
    // Validaciones básicas:
    // if (!email || !password || !nombre || !telefono || !id_rol) {
    //   return res.status(400).json({
    //     ...response,
    //     message:
    //       "Datos incompletos. Por favor, asegúrate de enviar email, contraseña, nombre, teléfono e ID del rol.",
    //   });
    // }
    try {
        // Insertar el nuevo usuario
        const query = `
            INSERT INTO tbl_usuarios (email, password, nombre, telefono, id_rol)
            VALUES ($1, $2, $3, $4, $5) RETURNING id
        `;
        // const result = await pool.query(query, [
        //   email,
        //   password,
        //   nombre,
        //   telefono,
        //   id_rol,
        // ]);
        return res.status(201).json({
            // ...response,
            message: "Usuario creado con éxito.",
            data: {
            // id: result.rows[0].id,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            // ...response,
            message: "Error al crear el usuario.",
            errors: [error],
        });
    }
};
exports.createUserHandler = createUserHandler;
