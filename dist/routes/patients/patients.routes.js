"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require__auth_middleware_1 = require("../../middlewares/require.-auth.middleware");
const isAdminOrDoctor_1 = require("../../middlewares/permissions/isAdminOrDoctor");
const get_patients_controller_1 = require("../../controllers/patients/get-patients.controller");
const get_patient_by_id_controller_1 = require("../../controllers/patients/get-patient-by-id.controller");
const delete_paitient_controller_1 = require("../../controllers/patients/delete-paitient.controller");
const update_patient_controller_1 = require("../../controllers/patients/update-patient.controller");
const create_patient_controller_1 = require("../../controllers/patients/create-patient.controller");
const router = (0, express_1.Router)();
router.get("/patients", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], get_patients_controller_1.getAllPatients);
router.get("/patients/:id", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], get_patient_by_id_controller_1.getPatientById);
router.delete("/patients/:id", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], delete_paitient_controller_1.deletePatient);
router.put("/patients/:id", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], update_patient_controller_1.updatePatient);
router.post("/patients", [require__auth_middleware_1.requireAuth, isAdminOrDoctor_1.isAdminOrDoctor], create_patient_controller_1.createPatient);
exports.default = router;