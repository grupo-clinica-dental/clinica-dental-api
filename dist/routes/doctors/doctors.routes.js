"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAdminOrDoctor_1 = require("../../middlewares/permissions/isAdminOrDoctor");
const require__auth_middleware_1 = require("../../middlewares/require.-auth.middleware");
const get_doctors_controller_1 = require("../../controllers/doctors/get-doctors.controller");
const get_doctor_by_id_controller_1 = require("../../controllers/doctors/get-doctor-by-id.controller");
const delete_doctor_controller_1 = require("../../controllers/doctors/delete-doctor.controller");
const isAdmin_1 = require("../../middlewares/permissions/isAdmin");
const update_doctor_controller_1 = require("../../controllers/doctors/update-doctor.controller");
const create_doctor_controller_1 = require("../../controllers/doctors/create-doctor.controller");
const router = (0, express_1.Router)();
router.get("/doctors", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], get_doctors_controller_1.getAllDoctors);
// Obtener un doctor específico por ID
router.get("/doctors/:id", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], get_doctor_by_id_controller_1.getDoctorById);
// // Eliminar un doctor por ID
router.delete("/doctors/:id", [require__auth_middleware_1.requireAuth, isAdmin_1.isAdmin], delete_doctor_controller_1.deleteDoctor);
// // Actualizar un doctor por ID
router.put("/doctors/:id", [require__auth_middleware_1.requireAuth, isAdmin_1.isAdmin], update_doctor_controller_1.updateDoctor);
// // Crear un nuevo doctor
router.post("/doctors", [require__auth_middleware_1.requireAuth, isAdmin_1.isAdmin], create_doctor_controller_1.createDoctor);
exports.default = router;
