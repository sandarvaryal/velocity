import express from "express";
const router = express.Router();

import { superAdminMiddleware } from "../../middlewares/superAdminMiddleware";
import { deleteBulkController } from "../../controllers/deleteBulkController";

router.delete("/deleteBulk", superAdminMiddleware, deleteBulkController);

export default router;
