import { Router } from "express";
import { requireAuth } from "../../middlewares/require.-auth.middleware";
import { isAdmin } from "../../middlewares/permissions/isAdmin";
import { isAdminOrDoctor } from "../../middlewares/permissions/isAdminOrDoctor";
import messagesTypesRoutes from "./messages-types/messages-types.routes";
import templatesRoutes from "./templates/messages-templates.routes";

const router = Router();

router.use("/messages", messagesTypesRoutes);

router.use("/messages", templatesRoutes);

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

export default router;
