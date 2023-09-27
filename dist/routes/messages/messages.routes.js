"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_types_routes_1 = __importDefault(require("./messages-types/messages-types.routes"));
const messages_templates_routes_1 = __importDefault(require("./templates/messages-templates.routes"));
const router = (0, express_1.Router)();
router.use("/messages", messages_types_routes_1.default);
router.use("/messages", messages_templates_routes_1.default);
// Obtener todos los mensajes
// router.get("/messages", [requireAuth, isAdminOrDoctor], getAllMessages);
// // Obtener un mensaje específico por ID
// router.get("/messages/:id", [requireAuth, isAdminOrDoctor], getMessageById);
// // Eliminar un mensaje por ID
// router.delete("/messages/:id", [requireAuth, isAdmin], deleteMessage);
// // Actualizar un mensaje por ID
// router.put("/messages/:id", [requireAuth, isAdmin], updateMessage);
// // Crear un nuevo mensaje
// router.post("/messages", [requireAuth, isAdmin], createMessage);
exports.default = router;
