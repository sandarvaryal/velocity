import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { bookShipmentSchema } from "../zodSchema/bookShipmentSchema";
import { destructureShipmentData } from "../utils/destructureShipmentData";
import SendmailTransport from "nodemailer/lib/sendmail-transport";
import { sendEmailOnBookment } from "../utils/sendEmailOnBookment";

const prisma = new PrismaClient();

const shipmentDataConfig = (variables: any) => ({
  id: variables.id,

  date: variables.date,
  awbNumber: variables.awbNumber,
  autoAwb: variables.autoAwb,
  trackingNumber: variables.trackingNumber,

  hub: variables.hub,
  service: variables.service,
  division: variables.division,
  totalBoxes: variables.totalBoxes,
  totalActualWeightKg: variables.totalActualWeightKg,
  totalVolumetricWeightKg: variables.totalChargeableWeightKg,
  totalChargeableWeightKg: variables.totalChargeableWeightKg,
  invoiceTotal: variables.invoiceTotal,
  contentDescriptions: variables.contentDescriptions,
  consignor: {
    create: {
      company: variables.consignorCompany,
      name: variables.consignorName,
      country: variables.consignorCountry,
      address1: variables.consignorAddress1,
      address2: variables.consignorAddress2,
      zip: variables.consignorZip,
      city: variables.consignorCity,
      state: variables.consignorState,
      phoneNumber: variables.consignorPhoneNumber,
      email: variables.consignorEmail,
    },
  },
  consignee: {
    create: {
      company: variables.consigneeCompany,
      name: variables.consigneeName,
      country: variables.consigneeCountry,
      address1: variables.consigneeAddress1,
      address2: variables.consigneeAddress2,
      zip: variables.consigneeZip,
      city: variables.consigneeCity,
      state: variables.consigneeState,
      phoneNumber: variables.consigneePhoneNumber,
      email: variables.consigneeEmail,
    },
  },
  Boxes: {
    create: variables.destructuredBoxes.map((box: any) => ({
      boxAwbNumber: box.boxAwbNumber,
      lengthCm: box.lengthCm,
      widthCm: box.widthCm,
      heightCm: box.heightCm,
      actualWeightKg: box.actualWeightKg,
      volumetricWeightKg: box.volumetricWeightKg,
      chargeableWeightKg: box.chargeableWeightKg,
      BoxesContent: {
        create: box.destructuredBoxContent.map((box: any) => ({
          id: box.id,
          description: box.description,
          HsCode: box.HsCode,
          quantity: box.quantity,
          unitType: box.unitType,
          unitRate: box.unitRate,
          unitWeight: box.unitWeight,
          total: box.total,
        })),
      },
    })),
  },
  verificationStatus: {
    create: {
      shipmentVerified: variables.shipmentVerified,
      shipmentVerifiedTime: variables.shipmentVerifiedTime,
      shipmentProcessed: variables.shipmentProcessed,
      shipmentDepartureTime: variables.shipmentDepartureTime,
    },
  },
});

export const createShipmentController = async (req: Request, res: Response) => {
  try {
    const shipment = bookShipmentSchema.safeParse(req.body);

    if (!shipment.success) {
      return res
        .status(400)
        .json({ message: "Invalid data", details: shipment.error.errors });
    }

    const tempVariables = destructureShipmentData(shipment, true);

    let variables: any;
    let variableAwbNumber: string;
    let autoAwb: any;
    const data: any = await prisma.shipment.findFirst({
      orderBy: {
        date: "desc",
      },
    });

    if (!tempVariables.awbNumber) {
      if (data) {
        autoAwb = data?.autoAwb + 1;
        variableAwbNumber = `${autoAwb}`;
      } else {
        variableAwbNumber = "7000000";
        autoAwb = 7000000;
      }

      // variableAwbNumber = `${data ? data?.autoAwb + 1 : 7000000}`;
      const destructuredBoxes = tempVariables.destructuredBoxes.map(
        (box: any, index: number) => {
          return {
            ...box,
            boxAwbNumber: `${variableAwbNumber}-${index + 1}`,
          };
        }
      );
      variables = {
        ...tempVariables,
        destructuredBoxes: destructuredBoxes,
        awbNumber: variableAwbNumber,
        autoAwb: autoAwb,
      };
    } else {
      if (data) {
        autoAwb = data?.autoAwb + 1;
      } else {
        autoAwb = 7000000;
      }
      variableAwbNumber = tempVariables.awbNumber;
      variables = {
        ...tempVariables,
        awbNumber: variableAwbNumber,
        autoAwb: autoAwb,
      };
    }

    const userId = req.user?.id;
    const createdShipment = await prisma.shipment.create({
      data: { ...shipmentDataConfig(variables), userId },
    });

    if (!createdShipment) {
      return res
        .status(500)
        .json({ message: "Something went wrong. Shipment not created" });
    }

    // const totalAddress = `${variables.consigneeCountry}, ${variables.consigneeState}, ${variables.consigneeCity}, ${variables.consigneeAddress1}, ${variables.consigneeZip}`;
    const totalAddress = {
      consigneeCountry: variables.consigneeCountry,
      consigneeState: variables.consigneeState,
      consigneeCity: variables.consigneeCity,
      consigneeAddress1: variables.consigneeAddress1,
      consigneeAddress2: variables.consigneeAdress2,
      consigneeZip: variables.consigneeZip,
    };
    sendEmailOnBookment(
      variables.consigneeEmail,
      variables.awbNumber,
      totalAddress,
      variables.totalBoxes
    );

    return res.status(200).json({ message: "Shipment booked successfully!" });
  } catch (e: any) {
    console.error(e);
    res.status(400).json({ error: e.errors });
  }
};
