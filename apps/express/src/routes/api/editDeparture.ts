import express from "express";
const router = express.Router();

import { authMiddleware } from "../../middlewares/auth_middleware";
import { editDepartureController } from "../../controllers/editDepartureController";
import { superAdminMiddleware } from "../../middlewares/superAdminMiddleware";

// router.put("/editDeparture/:id", authMiddleware, editDepartureController);
router.put("/editDeparture/:id", superAdminMiddleware, editDepartureController);

export default router;
