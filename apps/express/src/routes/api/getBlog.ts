import express from "express";
import { getBlogController } from "../../controllers/getBlogController";
const router = express.Router();
import { superAdminMiddleware } from "../../middlewares/superAdminMiddleware";

router.get("/getBlog", getBlogController);

export default router;
