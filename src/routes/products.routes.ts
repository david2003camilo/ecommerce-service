import { Router } from "express";
import { saveProducts } from "../controller/products.controller";

const router = Router();

router.post("/products", saveProducts);

export default router;
