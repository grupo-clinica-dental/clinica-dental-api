import { Router } from "express";
import { requireAuth } from "../../middlewares/require.-auth.middleware";
import { isAdmin } from "../../middlewares/permissions/isAdmin";
import { deleteAppointmentHandler } from "../../controllers/appointments/deleteAppointment.controller";
import { isAdminOrDoctor } from "../../middlewares/permissions/isAdminOrDoctor";
import { getAppointmentsHandler } from "../../controllers/appointments/getAppointments.controller";
import { createAppointmentHandler } from "../../controllers/appointments/create-appointment.controller";
import { getAppointmentById } from "../../controllers/appointments/get-appointment-by-id.controller";
import { rescheduleAppointment } from "../../controllers/appointments/re-schedule-appointment.controller";
import { updateAppointment } from "../../controllers/appointments/update-appointment.controller";
import appointmetsStatusRoutes from "./status/appointments.status.routes";

const router = Router();

// todo lo que no lleva el id se pone antes
// aca se usan los status de los appointments
router.use("/appointments", appointmetsStatusRoutes);

router.post(
  "/appointments",
  [requireAuth, isAdminOrDoctor],
  createAppointmentHandler
);

router.get(
  "/appointments",
  [requireAuth, isAdminOrDoctor],
  getAppointmentsHandler
);

router.get(
  "/appointments/:id",
  [requireAuth, isAdminOrDoctor],
  getAppointmentById
);

router.delete(
  "/appointments/:id",
  [requireAuth, isAdminOrDoctor],
  deleteAppointmentHandler
);

router.put("/appointments/:id", updateAppointment);

router.post(
  "/appointments/reschedule/:id",
  [requireAuth, isAdminOrDoctor],
  rescheduleAppointment
); // Endpoint específico para reagendar

export default router;
