import express from "express";
const router = express.Router();

import { authMiddleware } from "../../middlewares/auth_middleware";
import { getDashboardController } from "../../controllers/dashboardController";

router.get("/getDashboard", authMiddleware, getDashboardController);

export default router;
