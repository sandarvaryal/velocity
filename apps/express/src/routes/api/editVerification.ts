import express from "express";
const router = express.Router();

import { authMiddleware } from "../../middlewares/auth_middleware";
import { editVerificationController } from "../../controllers/editVerificationController";
import { superAdminMiddleware } from "../../middlewares/superAdminMiddleware";

// router.put("/editVerification/:id", authMiddleware, editVerificationController);

router.put(
  "/editVerification/:id",
  superAdminMiddleware,
  editVerificationController
);

export default router;
