import express from "express";
import { getShipmentsController } from "../../controllers/getShipmentControllers";
import { authMiddleware } from "../../middlewares/auth_middleware";

const router = express.Router();

router.get("/getShipments", authMiddleware, getShipmentsController);

export default router;
