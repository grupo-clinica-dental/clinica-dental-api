import { Router } from "express";
import { requireAuth } from "../../middlewares/require.-auth.middleware";
import { isAdmin } from "../../middlewares/permissions/isAdmin";
import { getAllSpecialties } from "../../controllers/doctors-specialties/get-doctors-specialties.controller";
import { isAdminOrDoctor } from "../../middlewares/permissions/isAdminOrDoctor";
import { getSpecialtyById } from "../../controllers/doctors-specialties/get-doctor-specialty-by-id.controller";
import { deleteSpecialty } from "../../controllers/doctors-specialties/delete-doctor-specialty.controller";
import { updateSpeciality } from "../../controllers/doctors-specialties/update-speciality.controller";
import { createSpecialty } from "../../controllers/doctors-specialties/create-speciality.controller";

const router = Router();

router.get("/specialties", [requireAuth, isAdminOrDoctor], getAllSpecialties);

router.get(
  "/specialties/:id",
  [requireAuth, isAdminOrDoctor],
  getSpecialtyById
);

router.delete("/specialties/:id", [requireAuth, isAdmin], deleteSpecialty);

router.put("/specialties/:id", [requireAuth, isAdmin], updateSpeciality);

router.post("/specialties", [requireAuth, isAdmin], createSpecialty);

export default router;
