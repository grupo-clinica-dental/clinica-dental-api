import { Router } from "express";
import { isAdminOrDoctor } from "../../middlewares/permissions/isAdminOrDoctor";
import { requireAuth } from "../../middlewares/require.-auth.middleware";
import { getAllDoctors } from "../../controllers/doctors/get-doctors.controller";
import { getDoctorById } from "../../controllers/doctors/get-doctor-by-id.controller";
import { deleteDoctor } from "../../controllers/doctors/delete-doctor.controller";
import { isAdmin } from "../../middlewares/permissions/isAdmin";
import { updateDoctor } from "../../controllers/doctors/update-doctor.controller";
import { createDoctor } from "../../controllers/doctors/create-doctor.controller";

const router = Router();

router.get("/doctors", [requireAuth, isAdminOrDoctor], getAllDoctors);

// Obtener un doctor específico por ID
router.get("/doctors/:id", [requireAuth, isAdminOrDoctor], getDoctorById);

// // Eliminar un doctor por ID
router.delete("/doctors/:id", [requireAuth, isAdmin], deleteDoctor);

// // Actualizar un doctor por ID
router.put("/doctors/:id", [requireAuth, isAdmin], updateDoctor);

// // Crear un nuevo doctor
router.post("/doctors", [requireAuth, isAdmin], createDoctor);

export default router;
