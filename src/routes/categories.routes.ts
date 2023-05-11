import { Router } from "express";
import {
  getAllCategories,
  save,
  update,
} from "../controller/categories.controller";

const router = Router();

router.get("/categories", getAllCategories);
router.post("/categories", save);
router.put("/categories/:id", update);

export default router;
