import {Router} from "express";
import {getAllOrders, getOrderById} from "./orders.controller";

const router = Router();

router.get("/", getAllOrders)
router.get("/:id", getOrderById)

export default router;