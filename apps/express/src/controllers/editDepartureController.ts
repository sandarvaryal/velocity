import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const paramSchema = z.object({
  id: z.string().uuid({ message: "Invalid shipment id" }),
});
const bodySchema = z.object({
  departure: z.boolean({ message: "Invalid value" }),
});

export const editDepartureController = async (req: Request, res: Response) => {
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
  const departureStatus = body.data.departure;

  try {
    const editedShipment = await prisma.shipment.update({
      where: {
        id: id,
      },
      data: {
        verificationStatus: {
          update: {
            shipmentDeparture: departureStatus,
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

    if (departureStatus && editedShipment?.consignee?.email) {
      try {
        const currentDate = new Date();
        await prisma.shipment.update({
          where: {
            id,
          },
          data: {
            verificationStatus: {
              update: {
                shipmentDepartureTime: currentDate,
              },
            },
          },
        });
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
                shipmentDepartureTime: null,
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
