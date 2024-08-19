import { Router } from "express";
import {
  getAllCategories,
  save,
  update,
} from "../controller/categories.controller";
import { authAdminMiddleware } from "../middleware/authmiddleware";

const router = Router();

router.get("/categories", getAllCategories);
router.post("/categories",authAdminMiddleware ,save);
router.put("/categories/:id", authAdminMiddleware, update);

export default router;
