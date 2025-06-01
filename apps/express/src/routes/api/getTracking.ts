import express from "express";
import { getTrackingController } from "../../controllers/getTrackingController";

const router = express.Router();

router.get("/getTracking/:awbNumber", getTrackingController);

export default router;
