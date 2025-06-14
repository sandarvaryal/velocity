import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
// import { addTrackingInstance } from "../utils/addTrackingInstance";

const prisma = new PrismaClient();

const bodySchema = z.object({
  //   id: z.string().uuid({ message: "Invalid shipment id" }),
  ids: z.array(z.string()),
  verified: z.boolean(),
  departure: z.boolean(),
  delivered: z.boolean(),
});
// const bodySchema = z.object({
//   verification: z.boolean({ message: "Invalid value" }),
// });

export const editBulkController = async (req: Request, res: Response) => {
  const body = bodySchema.safeParse(req.body);

  const role = req.user?.role;
  if (role !== "superAdmin") {
    return res.status(200).json({ message: "Unauthorized" });
  }

  if (!body.success) {
    return res.status(400).json({
      message: "Invalid id data",
      errors: body.error.format(),
    });
  }
  const { ids, verified, departure, delivered } = body.data;
  const date = new Date();

  try {
    const editedShipment = await prisma.verificationStatus.updateMany({
      where: {
        shipmentId: { in: ids },
      },
      data: {
        shipmentVerified: verified,
        shipmentProcessed: verified,
        shipmentDeparture: departure,
        shipmentDepartureTime: date,
        shipmentDelivered: delivered,
        shipmentDeliveredTime: date,
      },
    });
    return res.status(200).json({ message: "Shipment updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
};
