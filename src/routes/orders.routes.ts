import { Router } from "express";
import { findAll, findByIdDetail } from "../controller/orders.controller";
import { authClientMiddleware } from "../middleware/authmiddleware";

const router = Router();

router.get("/orders", authClientMiddleware, findAll);
router.get("/order/detail/:id", authClientMiddleware, findByIdDetail);

export default router;
