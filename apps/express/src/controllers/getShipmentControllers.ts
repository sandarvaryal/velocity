import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { z } from "zod";

const filterParamSchema = z.object({
  page: z.coerce.number(),
  awbNumber: z.string({ message: "Invalid awbNumber value" }).optional(),
  consignorName: z
    .string({ message: "Invalid consignorName value" })
    .optional(),
  consigneeName: z
    .string({ message: "Invalid consigneeName value" })
    .optional(),
  consignorPhone: z
    .string({ message: "Invalid consignorPhone value" })
    .optional(),
  consigneePhone: z
    .string({ message: "Invalid consigneePhone value" })
    .optional(),
  to: z.string({ message: "Invalid to value" }).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export const getShipmentsController = async (req: Request, res: Response) => {
  const data = filterParamSchema.safeParse(req.query);
  if (!data.success) {
    return res.status(400).json({
      message: "Invalid query parameters",
      errors: data.error.format(),
    });
  }

  const {
    page,
    awbNumber,
    consignorName,
    consigneePhone,
    consigneeName,
    consignorPhone,
    to,
    dateFrom,
    dateTo,
  } = data.data;

  const includeConfig = {
    consignor: {
      select: {
        name: true,
        country: true,
      },
    },
    consignee: {
      select: {
        name: true,
        country: true,
      },
    },
    verificationStatus: true,
  };

  const filterCriteria: any = {};

  if (awbNumber) filterCriteria.awbNumber = awbNumber;
  if (consignorName)
    filterCriteria.consignor = { name: { contains: consignorName } };
  if (consigneeName)
    filterCriteria.consignee = { name: { contains: consigneeName } };
  if (consignorPhone)
    filterCriteria.consignor = {
      ...filterCriteria.consignor,
      phoneNumber: { contains: consignorPhone },
    };
  if (consigneePhone)
    filterCriteria.consignee = {
      ...filterCriteria.consignee,
      phoneNumber: { contains: consigneePhone },
    };
  if (to)
    filterCriteria.consignee = {
      ...filterCriteria.consignee,
      country: { contains: to },
    };
  //date ko logic
  if (dateFrom || dateTo) {
    filterCriteria.date = {};

    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      if (!isNaN(fromDate.getTime())) {
        filterCriteria.date.gte = fromDate;
      }
    }

    if (dateTo) {
      const toDate = new Date(dateTo);
      if (!isNaN(toDate.getTime())) {
        toDate.setHours(23, 59, 59, 999);
        filterCriteria.date.lte = toDate;
      }
    }
  }

  const limit = 20;
  const startIndex = (page - 1) * limit;

  if (Object.keys(filterCriteria).length === 0) {
    try {
      const shipment = await prisma.shipment.findMany({
        skip: startIndex,
        take: limit,
        orderBy: {
          date: "desc",
        },
        include: includeConfig,
      });

      const recordNumber = await prisma.shipment.count();
      const totalPage = Math.ceil(recordNumber / limit);
      if (!shipment) {
        return res.status(404).json({ message: "Shipment not found" });
      }

      return res.json({ shipment, totalPage });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  try {
    const shipment = await prisma.shipment.findMany({
      skip: startIndex,
      take: limit,
      where: filterCriteria,
      include: includeConfig,
    });
    const recordNumber = await prisma.shipment.count({
      where: filterCriteria,
    });
    const totalPage = Math.ceil(recordNumber / limit);

    if (!shipment) {
      return res.status(404).json({ message: "No Shipment found" });
    }

    return res.json({ shipment, totalPage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getShipmentController = async (req: Request, res: Response) => {
  const awbNumber = req.params.awbNumber;

  if (awbNumber) {
    try {
      const shipment = await prisma.shipment.findUnique({
        where: {
          awbNumber: awbNumber,
        },
        include: {
          consignor: true,
          consignee: true,
          Boxes: {
            include: {
              BoxesContent: true,
            },
          },
          verificationStatus: true,
        },
      });

      if (!shipment) {
        return res.status(404).json({ message: "Shipment not found" });
      }
      res.json(shipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ message: "Invalid or missing AWB number" });
  }
};
