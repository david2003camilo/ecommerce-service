import { Router } from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
  saveProducts,
  updateProduct,
} from "../controller/products.controller";
import { authAdminMiddleware } from "../middleware/authmiddleware";

const router = Router();

router.post("/products", authAdminMiddleware, saveProducts);
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.put("/products/:id", authAdminMiddleware, updateProduct);
router.delete("/product/:id", authAdminMiddleware, deleteProduct);

export default router;
