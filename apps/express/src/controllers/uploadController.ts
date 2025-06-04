import { Request, Response } from "express";

import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3 = new S3Client({
  endpoint: process.env.R2_ENDPOINT || "",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
  region: process.env.R2_REGION,
});

export const uploadController = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "Please upload a file" });
  }
  const key = `${Date.now()}-${file.originalname}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || "",
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );
  console.log("Buffer size:", file.buffer ? file.buffer.length : "undefined");
  console.log("File size:", file.size);
  console.log("MIME type:", file.mimetype);

  const url = `${process.env.R2_URL}/${key}`;
  console.log(url);

  res.json({ url: url });
};
