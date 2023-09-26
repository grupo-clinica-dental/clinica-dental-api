import { Router } from "express";
import { requireAuth } from "../../middlewares/require.-auth.middleware";
import { isAdminOrDoctor } from "../../middlewares/permissions/isAdminOrDoctor";
import { getAllPatients } from "../../controllers/patients/get-patients.controller";
import { getPatientById } from "../../controllers/patients/get-patient-by-id.controller";
import { deletePatient } from "../../controllers/patients/delete-paitient.controller";
import { updatePatient } from "../../controllers/patients/update-patient.controller";
import { createPatient } from "../../controllers/patients/create-patient.controller";

const router = Router();

router.get("/patients", [requireAuth, isAdminOrDoctor], getAllPatients);
router.get("/patients/:id", [requireAuth, isAdminOrDoctor], getPatientById);
router.delete("/patients/:id", [requireAuth, isAdminOrDoctor], deletePatient);
router.put("/patients/:id", [requireAuth, isAdminOrDoctor], updatePatient);
router.post("/patients", [requireAuth, isAdminOrDoctor], createPatient);

export default router;
