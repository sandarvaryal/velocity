import express from "express";
const router = express.Router();

import { authMiddleware } from "../../middlewares/auth_middleware";
import { editDeliveredController } from "../../controllers/editDeliveredController";
import { superAdminMiddleware } from "../../middlewares/superAdminMiddleware";

// router.put("/editDelivered/:id", authMiddleware, editDeliveredController);
router.put("/editDelivered/:id", superAdminMiddleware, editDeliveredController);

export default router;
