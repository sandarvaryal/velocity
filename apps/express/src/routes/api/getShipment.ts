import express from "express";
import { getShipmentController } from "../../controllers/getShipmentControllers";
import { authMiddleware } from "../../middlewares/auth_middleware";

const router = express.Router();

router.get("/getShipment/:awbNumber", authMiddleware, getShipmentController);

export default router;
