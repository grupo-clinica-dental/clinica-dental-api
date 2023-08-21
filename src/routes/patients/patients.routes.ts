import { Router } from "express";
import { requireAuth } from "../../middlewares/require.-auth.middleware";
import { isAdminOrDoctor } from "../../middlewares/permissions/isAdminOrDoctor";
import { getAllPatients } from "../../controllers/patients/get-patients.controller";

const router = Router();

router.get("/patients", [requireAuth, isAdminOrDoctor], getAllPatients);
// router.get("/patients/:id", [requireAuth, isAdminOrDoctor], getPatientById);
// router.delete("/patients/:id", [requireAuth, isAdminOrDoctor], deletePatient);
// router.put("/patients/:id", [requireAuth, isAdminOrDoctor], updatePatient);
// router.post("/patients", [requireAuth, isAdminOrDoctor], createPatient);

export default router;
