import { Router } from "express";
import { registerUser, updateUser } from "../controller/users.controller";
import { authClientMiddleware } from "../middleware/authmiddleware";
import { userCreateSchema } from "../schemas/user.schema";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.post("/users", validateRequest(userCreateSchema), registerUser);
router.put("/users/:email", validateRequest(userCreateSchema), authClientMiddleware, updateUser);

export default router;
