import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { addTrackingInstance } from "../utils/addTrackingInstance";

const prisma = new PrismaClient();

const paramSchema = z.object({
  id: z.string().uuid({ message: "Invalid shipment id" }),
});
const bodySchema = z.object({
  verification: z.boolean({ message: "Invalid value" }),
});

export const editVerificationController = async (
  req: Request,
  res: Response
) => {
  const data = paramSchema.safeParse(req.params);
  const body = bodySchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({
      message: "Invalid params",
      errors: data.error.format(),
    });
  }
  if (!body.success) {
    return res.status(400).json({
      message: "Invalid status data",
      errors: body.error.format(),
    });
  }
  const id = data.data.id;
  const verificationStatus = body.data.verification;

  try {
    const editedShipment = await prisma.shipment.update({
      where: {
        id: id,
      },
      data: {
        verificationStatus: {
          update: {
            shipmentVerified: verificationStatus,
            shipmentProcessed: verificationStatus,
          },
        },
      },
      include: {
        consignee: {
          select: {
            email: true,
          },
        },
      },
    });

    if (verificationStatus && editedShipment?.consignee?.email) {
      try {
        const currentDate = new Date();
        await prisma.shipment.update({
          where: {
            id,
          },
          data: {
            verificationStatus: {
              update: {
                shipmentVerifiedTime: currentDate,
              },
            },
          },
        });
        addTrackingInstance(
          editedShipment.trackingNumber,
          editedShipment.service
        );
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server Error" });
      }
    } else {
      try {
        await prisma.shipment.update({
          where: {
            id,
          },
          data: {
            verificationStatus: {
              update: {
                shipmentVerifiedTime: null,
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server Error" });
      }
    }

    return res.status(200).json({ message: "Shipment updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
