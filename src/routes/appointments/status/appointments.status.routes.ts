import { Router } from "express";
import { getAllAppointmentStatuses } from "../../../controllers/appointments/status/get-appointments-status.controller";
import { requireAuth } from "../../../middlewares/require.-auth.middleware";
import { isAdminOrDoctor } from "../../../middlewares/permissions/isAdminOrDoctor";
import { isAdmin } from "../../../middlewares/permissions/isAdmin";
import { getAppointmentById } from "../../../controllers/appointments/get-appointment-by-id.controller";
import { getAppointmentStatusById } from "../../../controllers/appointments/status/get-appointments-status-by-id.controller";
import { createAppointmentStatus } from "../../../controllers/appointments/status/create-appointment-status.controller";
import { deleteAppointmentStatus } from "../../../controllers/appointments/status/delete-appointment-status.controller";
import { updateAppointmentStatus } from "../../../controllers/appointments/status/update-appointment-status.controller";

const router = Router();

router.get(
  "/status",
  [requireAuth, isAdminOrDoctor],
  getAllAppointmentStatuses
);

router.post("/status", [requireAuth, isAdmin], createAppointmentStatus);

router.get(
  "/status/:id",
  [requireAuth, isAdminOrDoctor],
  getAppointmentStatusById
);

router.delete("/status/:id", [requireAuth, isAdmin], deleteAppointmentStatus);

router.put(
  "/status/:id",
  [requireAuth, isAdminOrDoctor],
  updateAppointmentStatus
);

export default router;
