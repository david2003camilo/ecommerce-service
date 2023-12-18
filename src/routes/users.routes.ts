import { Router } from "express";
import { registerUser, updateUser } from "../controller/users.controller";
import { authClientMiddleware } from "../middleware/authmiddleware";

const router = Router();

router.post("/users", registerUser);
router.put("/users/:email", authClientMiddleware, updateUser);

export default router;
