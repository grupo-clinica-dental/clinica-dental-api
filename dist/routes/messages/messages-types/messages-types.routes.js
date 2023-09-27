"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require__auth_middleware_1 = require("../../../middlewares/require.-auth.middleware");
const isAdminOrDoctor_1 = require("../../../middlewares/permissions/isAdminOrDoctor");
const get_messages_types_controller_1 = require("../../../controllers/messages/messages-types/get-messages-types.controller");
const get_messages_type_by_id_controller_1 = require("../../../controllers/messages/messages-types/get-messages-type-by-id.controller");
const create_messages_type_controller_1 = require("../../../controllers/messages/messages-types/create-messages-type.controller");
const isAdmin_1 = require("../../../middlewares/permissions/isAdmin");
const update_type_controller_1 = require("../../../controllers/messages/messages-types/update-type.controller");
const router = (0, express_1.Router)();
// Obtener todos los tipos de mensajes
router.get("/types", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], get_messages_types_controller_1.getAllTypes);
// Obtener un tipo de mensaje específico por ID
router.get("/types/:id", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], get_messages_type_by_id_controller_1.getTypeById);
// Crear un nuevo tipo de mensaje
router.post("/types", [require__auth_middleware_1.requireAuth, isAdmin_1.isAdmin], create_messages_type_controller_1.createType);
// Actualizar un tipo de mensaje por ID
router.put("/types/:id", [require__auth_middleware_1.requireAuth, isAdmin_1.isAdmin], update_type_controller_1.updateType);
// Eliminar un tipo de mensaje por ID
// router.delete("/types/:id"[(requireAuth, isAdmin)], deleteType);
exports.default = router;
