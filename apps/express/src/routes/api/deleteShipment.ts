import express from "express";
const router = express.Router();

import { deleteShipmentController } from "../../controllers/deleteShipmentControllers";
import { authMiddleware } from "../../middlewares/auth_middleware";
import { superAdminMiddleware } from "../../middlewares/superAdminMiddleware";

// router.delete("/deleteShipment/:id", authMiddleware, deleteShipmentController);
router.delete(
  "/deleteShipment/:id",
  superAdminMiddleware,
  deleteShipmentController
);

export default router;
