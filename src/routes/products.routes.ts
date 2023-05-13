import { Router } from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
  saveProducts,
  updateProduct,
} from "../controller/products.controller";

const router = Router();

router.post("/products", saveProducts);
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
