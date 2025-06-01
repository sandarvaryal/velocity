import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const bodySchema = z.object({
  awbNumber: z.string().min(1, { message: "Name is required" }),
});

export const awbExistsController = async (req: Request, res: Response) => {
  const data = bodySchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({
      message: "Invalid params",
      errors: data.error.format(),
    });
  }
  const awbNumber = data.data.awbNumber;

  try {
    const shipment = await prisma.shipment.findFirst({
      where: {
        awbNumber,
      },
    });

    if (!shipment) {
      return res.status(404).json({ message: "Shipment Not Found" });
    }
    return res.status(200).json({ message: "Shipment Found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
