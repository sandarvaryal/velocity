import express from "express";
import { postBlogController } from "../../controllers/postBlogController";
const router = express.Router();
import { superAdminMiddleware } from "../../middlewares/superAdminMiddleware";

router.post("/postBlog", superAdminMiddleware, postBlogController);

export default router;
