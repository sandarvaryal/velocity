import express from "express";
import { uploadController } from "../../controllers/uploadController";

const router = express.Router();

import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

router.post("/uploadImage", upload.single("myFile"), uploadController);

export default router;
