import { Router } from "express";
import { requireAuth } from "../../middlewares/require.-auth.middleware";
import { isAdmin } from "../../middlewares/permissions/isAdmin";
import { getAllRoles } from "../../controllers/roles/get-roles.controller";
import { getRoleById } from "../../controllers/roles/get-role-by-id.controller";
import { deleteRole } from "../../controllers/roles/delete-role.controller";
import { updateRole } from "../../controllers/roles/update-role.controller";
import { createRole } from "../../controllers/roles/create-role.controller";

const router = Router();

router.get("/roles", [requireAuth, isAdmin], getAllRoles);
router.get("/roles/:id", [requireAuth, isAdmin], getRoleById);
router.delete("/roles/:id", [requireAuth, isAdmin], deleteRole);
router.put("/roles/:id", [requireAuth, isAdmin], updateRole);
router.post("/roles", [requireAuth, isAdmin], createRole);

export default router;
