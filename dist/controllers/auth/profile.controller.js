"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileHandler = void 0;
const create_new_api_response_1 = require("../../libs/create-new-api-response");
const profileHandler = (req, res) => {
    const user = req.user;
    const response = (0, create_new_api_response_1.getNewResponseApi)();
    if (!user) {
        return res.status(400).json({
            ...response,
            message: "Error: Usuario no encontrado.",
            succeded: false,
        });
    }
    res.status(200).json({
        ...response,
        data: { user },
        message: "Perfil del usuario con id: " + user.id,
        succeded: true,
    });
};
exports.profileHandler = profileHandler;
