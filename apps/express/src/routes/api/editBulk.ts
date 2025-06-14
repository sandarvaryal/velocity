import express from "express";
const router = express.Router();

import { superAdminMiddleware } from "../../middlewares/superAdminMiddleware";
import { editBulkController } from "../../controllers/editBulkController";

router.put("/editBulk", superAdminMiddleware, editBulkController);

export default router;
