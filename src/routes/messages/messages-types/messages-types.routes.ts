import { Router } from "express";
import { requireAuth } from "../../../middlewares/require.-auth.middleware";
import { isAdminOrDoctor } from "../../../middlewares/permissions/isAdminOrDoctor";
import { getAllTypes } from "../../../controllers/messages/messages-types/get-messages-types.controller";
import { getTypeById } from "../../../controllers/messages/messages-types/get-messages-type-by-id.controller";
import { createType } from "../../../controllers/messages/messages-types/create-messages-type.controller";
import { isAdmin } from "../../../middlewares/permissions/isAdmin";
import { updateType } from "../../../controllers/messages/messages-types/update-type.controller";

const router = Router();

// Obtener todos los tipos de mensajes
router.get("/types", [requireAuth, isAdminOrDoctor], getAllTypes);

// Obtener un tipo de mensaje específico por ID
router.get("/types/:id", [requireAuth, isAdminOrDoctor], getTypeById);

// Crear un nuevo tipo de mensaje
router.post("/types", [requireAuth, isAdmin], createType);

// Actualizar un tipo de mensaje por ID
router.put("/types/:id", [requireAuth, isAdmin], updateType);

// Eliminar un tipo de mensaje por ID
// router.delete("/types/:id"[(requireAuth, isAdmin)], deleteType);

export default router;
