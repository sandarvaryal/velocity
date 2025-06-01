import express from "express";
import { awbExistsController } from "../../controllers/awbExistsController";

const router = express.Router();

router.post("/awbExists", awbExistsController);

export default router;
