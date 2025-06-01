import express from "express";
import { editShipmentController } from "../../controllers/editShipmentController";
const router = express.Router();
import { authMiddleware } from "../../middlewares/auth_middleware";

router.put("/editShipment/:awbNumber", authMiddleware, editShipmentController);

export default router;
