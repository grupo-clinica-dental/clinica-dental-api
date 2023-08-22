import { Router } from "express";
import { requireAuth } from "../../../middlewares/require.-auth.middleware";
import { isAdmin } from "../../../middlewares/permissions/isAdmin";
import { isAdminOrDoctor } from "../../../middlewares/permissions/isAdminOrDoctor";
import { getAllTemplates } from "../../../controllers/messages/templates/get-templates.controller";
import { getTemplateById } from "../../../controllers/messages/templates/get-template-by-id.controller";
import { createTemplate } from "../../../controllers/messages/templates/create-template.controller";
import { updateTemplate } from "../../../controllers/messages/templates/update-template.controller";
import { deleteTemplate } from "../../../controllers/messages/templates/delete-template.controller";

const router = Router();

router.get("/templates", [requireAuth, isAdminOrDoctor], getAllTemplates);

router.get("/templates/:id", [requireAuth, isAdminOrDoctor], getTemplateById);

router.post("/templates", [requireAuth, isAdminOrDoctor], createTemplate);

router.put("/templates/:id", [requireAuth, isAdminOrDoctor], updateTemplate);

router.delete("/templates/:id", [requireAuth, isAdminOrDoctor], deleteTemplate);

export default router;
