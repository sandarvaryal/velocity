import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const bodySchema = z.object({
  ids: z.array(z.string()),
});

export const deleteBulkController = async (req: Request, res: Response) => {
  const body = bodySchema.safeParse(req.body);

  const role = req.user?.role;
  if (role !== "superAdmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!body.success) {
    return res.status(400).json({
      message: "Invalid id data",
      errors: body.error.format(),
    });
  }
  const { ids } = body.data;

  try {
    const editedShipment = await prisma.shipment.deleteMany({
      where: {
        id: { in: ids },
      },
    });
    if (!editedShipment) {
      return res.status(400).json({ message: "Failed to Delete Shipments" });
    }
    return res.status(200).json({ message: "Shipment Deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
};
