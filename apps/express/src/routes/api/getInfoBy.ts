import express from "express";
import { getInfoByController } from "../../controllers/getInfoByController";
const router = express.Router();
import { authMiddleware } from "../../middlewares/auth_middleware";

router.post("/getInfoBy", authMiddleware, getInfoByController);

export default router;
