import { Router } from "express";
import { login } from "../controller/auth.controller";
import { validateRequest } from "../middleware/validateRequest";
import { loginSchema } from "../schemas/login.schema";

const router = Router();

router.post("/auth/login",validateRequest(loginSchema), login);

export default router;
