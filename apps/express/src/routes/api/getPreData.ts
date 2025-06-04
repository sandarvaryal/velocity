import express from "express";
const router = express.Router();

import { authMiddleware } from "../../middlewares/auth_middleware";
import { getPreDataController } from "../../controllers/getPreData";

router.get("/getPreData", authMiddleware, getPreDataController);

export default router;
