import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const deleteParamSchema = z.object({
  id: z.string().uuid({ message: "Invalid shipment id" }),
});

export const deleteShipmentController = async (req: Request, res: Response) => {
  console.log("query", req.query, "param", req.param);
  const data = deleteParamSchema.safeParse(req.params);

  const role = req.user?.role;
  if (role !== "superAdmin") {
    return res.status(200).json({ message: "Unauthorized" });
  }

  if (!data.success) {
    return res.status(400).json({
      message: "Invalid params",
      errors: data.error.format(),
    });
  }
  const id = data.data.id;

  try {
    const deletedInstance = await prisma.shipment.delete({
      where: {
        id: id,
      },
    });

    if (!deletedInstance) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    return res.status(200).json({ message: "Shipment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
