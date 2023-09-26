import { Router } from "express";
import { requireAuth } from "../../middlewares/require.-auth.middleware";
import { isAdmin } from "../../middlewares/permissions/isAdmin";
import { getUsersHandler } from "../../controllers/users/get-users.controller";
import { getUserById } from "../../controllers/users/get-user-by-id";
import { deleteUser } from "../../controllers/users/delete-user.controller";
import { updateUserHandler } from "../../controllers/users/update-user.controller";
import { createUserHandler } from "../../controllers/users/create-user.controller";

const router = Router();

router.get("/users", [requireAuth, isAdmin], getUsersHandler);

router.get("/users/:id", [requireAuth, isAdmin], getUserById);

router.delete("/users/:id", [requireAuth, isAdmin], deleteUser);

router.put("/users/:id", [requireAuth, isAdmin], updateUserHandler);

router.post("/users", [requireAuth, isAdmin], createUserHandler);

export default router;
