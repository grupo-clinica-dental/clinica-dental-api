"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require__auth_middleware_1 = require("../../middlewares/require.-auth.middleware");
const deleteAppointment_controller_1 = require("../../controllers/appointments/deleteAppointment.controller");
const isAdminOrDoctor_1 = require("../../middlewares/permissions/isAdminOrDoctor");
const getAppointments_controller_1 = require("../../controllers/appointments/getAppointments.controller");
const create_appointment_controller_1 = require("../../controllers/appointments/create-appointment.controller");
const get_appointment_by_id_controller_1 = require("../../controllers/appointments/get-appointment-by-id.controller");
const re_schedule_appointment_controller_1 = require("../../controllers/appointments/re-schedule-appointment.controller");
const update_appointment_controller_1 = require("../../controllers/appointments/update-appointment.controller");
const appointments_status_routes_1 = __importDefault(require("./status/appointments.status.routes"));
const router = (0, express_1.Router)();
// todo lo que no lleva el id se pone antes
// aca se usan los status de los appointments
router.use("/appointments", appointments_status_routes_1.default);
router.post("/appointments", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], create_appointment_controller_1.createAppointmentHandler);
router.get("/appointments", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], getAppointments_controller_1.getAppointmentsHandler);
router.get("/appointments/:id", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], get_appointment_by_id_controller_1.getAppointmentById);
router.delete("/appointments/:id", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], deleteAppointment_controller_1.deleteAppointmentHandler);
router.put("/appointments/:id", update_appointment_controller_1.updateAppointment);
router.post("/appointments/reschedule/:id", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], re_schedule_appointment_controller_1.rescheduleAppointment); // Endpoint específico para reagendar
exports.default = router;
