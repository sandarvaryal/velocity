import express from "express";
import { createShipmentController } from "../../controllers/bookShipmentController";
import { authMiddleware } from "../../middlewares/auth_middleware";

const router = express.Router();

router.post("/bookShipment", authMiddleware, createShipmentController);

export default router;
