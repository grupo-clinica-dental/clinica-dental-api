import { Router } from "express";
import { loginHandler } from "../controllers/auth/login.controller";
import { profileHandler } from "../controllers/auth/profile.controller";
import { requireAuth } from "../middlewares/require.-auth.middleware";

const router = Router();

router.get("/profile", requireAuth, profileHandler);

router.post("/login", loginHandler );



export default router;
