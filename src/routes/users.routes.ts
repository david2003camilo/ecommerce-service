import { Router } from "express";
import { registerUser, updateUser } from "../controller/users.controller";

const router = Router();

router.post("/users", registerUser);
router.put("/users/:email", updateUser);

export default router;
