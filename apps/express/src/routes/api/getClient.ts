import express from "express";
const router = express.Router();

import { authMiddleware } from "../../middlewares/auth_middleware";
import { getClientController } from "../../controllers/getClientController";

router.get("/getClient", authMiddleware, getClientController);

export default router;
