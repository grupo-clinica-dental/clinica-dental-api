"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require__auth_middleware_1 = require("../../middlewares/require.-auth.middleware");
const isAdmin_1 = require("../../middlewares/permissions/isAdmin");
const get_doctors_specialties_controller_1 = require("../../controllers/doctors-specialties/get-doctors-specialties.controller");
const isAdminOrDoctor_1 = require("../../middlewares/permissions/isAdminOrDoctor");
const get_doctor_specialty_by_id_controller_1 = require("../../controllers/doctors-specialties/get-doctor-specialty-by-id.controller");
const delete_doctor_specialty_controller_1 = require("../../controllers/doctors-specialties/delete-doctor-specialty.controller");
const update_speciality_controller_1 = require("../../controllers/doctors-specialties/update-speciality.controller");
const create_speciality_controller_1 = require("../../controllers/doctors-specialties/create-speciality.controller");
const router = (0, express_1.Router)();
router.get("/specialties", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], get_doctors_specialties_controller_1.getAllSpecialties);
router.get("/specialties/:id", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], get_doctor_specialty_by_id_controller_1.getSpecialtyById);
router.delete("/specialties/:id", [require__auth_middleware_1.requireAuth, isAdmin_1.isAdmin], delete_doctor_specialty_controller_1.deleteSpecialty);
router.put("/specialties/:id", [require__auth_middleware_1.requireAuth, isAdmin_1.isAdmin], update_speciality_controller_1.updateSpeciality);
router.post("/specialties", [require__auth_middleware_1.requireAuth, isAdmin_1.isAdmin], create_speciality_controller_1.createSpecialty);
exports.default = router;