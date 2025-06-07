import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const dashboardParam = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  //   sortBy: z.enum(["today", "week", "year", "allTime"]).optional(),
  sortBy: z.enum(["week", "year", "allTime"]).optional(),
});

export const getDashboardController = async (req: Request, res: Response) => {
  const data = dashboardParam.safeParse(req.query);
  if (!data.success) {
    return res.status(400).json({
      message: "Invalid query parameters",
      errors: data.error.format(),
    });
  }

  const { dateFrom, dateTo, sortBy = "week" } = data.data;

  const includeConfig = {
    consignor: {
      select: { name: true, country: true },
    },
    consignee: {
      select: { name: true, country: true },
    },

    verificationStatus: true,
  };

  const userId = req.user?.id;
  const role = req.user?.role;
  let filterCriteria: any;

  if (role === "superAdmin") {
    filterCriteria = {};
  } else {
    filterCriteria = { userId };
  }

  if (dateFrom || dateTo) {
    filterCriteria.date = {};
    if (dateFrom) filterCriteria.date.gte = new Date(dateFrom);
    if (dateTo) {
      const endOfDay = new Date(dateTo);
      endOfDay.setHours(23, 59, 59, 999);
      filterCriteria.date.lte = endOfDay;
    }
  } else if (sortBy === "week") {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    filterCriteria.date = { gte: lastWeek };
  } else if (sortBy === "year") {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    filterCriteria.date = { gte: startOfYear };
  }

  try {
    const shipment = await prisma.shipment.findMany({
      where: filterCriteria,
      include: includeConfig,
    });
    const latestShipments = await prisma.shipment.findMany({
      where: {},
      take: 10,
      orderBy: { date: "desc" },
      include: includeConfig,
    });

    if (shipment.length === 0) {
      return res.status(200).json({ message: "No Shipment found" });
    }

    //logicccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    const objOnDeparture = shipment.filter(
      (shipment: any) => shipment.verificationStatus.shipmentDeparture === true
    );
    const objVerified = shipment.filter(
      (shipment: any) => shipment.verificationStatus.shipmentVerified === true
    );
    const objDelivered = shipment.filter(
      (shipment: any) => shipment.verificationStatus.shipmentDelivered === true
    );

    const totalShipment = shipment.length;
    const totalDeparture = objOnDeparture.length;
    const totalVerified = objVerified.length;
    const totalDelivered = objDelivered.length;
    //logiccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc

    const shipmentCountsByDate: Record<string, any> = {};
    shipment.forEach((shipment: any) => {
      const dateKey = new Date(shipment.date).toISOString().split("T")[0];

      if (!shipmentCountsByDate[dateKey]) {
        shipmentCountsByDate[dateKey] = { date: dateKey, totalShipments: 0 };
      }

      shipmentCountsByDate[dateKey].totalShipments++;
    });
    const barChartData = Object.values(shipmentCountsByDate);

    const countryWeights: Record<string, number> = {};

    shipment.forEach((shipment: any) => {
      const country = shipment.consignee.country;
      const weight = shipment.totalActualWeightKg;

      if (!countryWeights[country]) {
        countryWeights[country] = 0;
      }
      countryWeights[country] += weight;
    });

    const sortedCountries = Object.entries(countryWeights)
      .sort(([, weightA], [, weightB]) => weightB - weightA)
      .map(([country, weight]) => ({ country, weight }));

    const top3 = sortedCountries.slice(0, 3);
    const othersTotal = sortedCountries
      .slice(3)
      .reduce((sum, entry) => sum + entry.weight, 0);

    const pieChartData = [...top3, { country: "Others", weight: othersTotal }];

    const weightByDate: Record<string, any> = {};

    shipment.forEach((shipment: any) => {
      const dateKey = new Date(shipment.date).toISOString().split("T")[0];
      const weight = shipment.totalActualWeightKg;

      if (!weightByDate[dateKey]) {
        weightByDate[dateKey] = { date: dateKey, totalWeight: 0 };
      }

      weightByDate[dateKey].totalWeight += weight;
    });

    const lineChartData = Object.values(weightByDate);

    const responseObj = {
      shipment,
      latestShipments,
      barChartData,
      pieChartData,
      lineChartData,
      totalShipment,
      totalDeparture,
      totalVerified,
      totalDelivered,
    };

    // return res.json({ shipment });
    return res.status(200).json(responseObj);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
