import express from "express";
const router = express.Router();

import { superAdminMiddleware } from "../../middlewares/superAdminMiddleware";
import { getClientController } from "../../controllers/getClientController";

router.get("/getClient", superAdminMiddleware, getClientController);

export default router;
