import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { bookShipmentSchema } from "../zodSchema/bookShipmentSchema";
import { destructureShipmentData } from "../utils/destructureShipmentData";
import { addTrackingInstance } from "../utils/addTrackingInstance";

const prisma = new PrismaClient();

export const editShipmentController = async (req: Request, res: Response) => {
  const awbNumber = req.params.awbNumber;

  if (!awbNumber) {
    return res.status(400).json({ message: "Invalid or missing AWB number" });
  }

  try {
    const shipment = bookShipmentSchema.safeParse(req.body);

    if (!shipment.success) {
      return res
        .status(400)
        .json({ message: "Invalid data", details: shipment.error.errors });
    }

    let tempVariables = destructureShipmentData(shipment, false);

    const shipmentId = tempVariables.id;

    let trackingId: any = null;
    if (tempVariables.shipmentVerified) {
      try {
        const response = await addTrackingInstance(
          tempVariables.trackingNumber,
          tempVariables.service
        );

        trackingId = response.data.id;
      } catch (error) {
        console.error(error);
      }
    }

    let variables: any;
    let variableAwbNumber: any;
    let autoAwbNumber: any;
    const data = await prisma.shipment.findFirst({
      where: { id: shipmentId },
    });
    if (!tempVariables.awbNumber) {
      variableAwbNumber = data?.autoAwb.toString();
      autoAwbNumber = data?.autoAwb;
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
        autoAwb: autoAwbNumber,
      };
    } else {
      variableAwbNumber = tempVariables.awbNumber;
      variables = {
        ...tempVariables,
        awbNumber: variableAwbNumber,
        // autoAwb: autoAwbNumber,
        autoAwb: data?.autoAwb,
      };
    }

    await prisma.shipment.delete({
      where: { id: shipmentId },
    });
    console.log(variables);

    await prisma.shipment.create({
      data: {
        id: shipmentId,
        awbNumber: variables.awbNumber,
        autoAwb: variables.autoAwb,
        trackingNumber: variables.trackingNumber,
        trackingId,

        date: variables.date,
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
        verificationStatus: {
          create: {
            shipmentVerified: variables.shipmentVerified,
            shipmentVerifiedTime: variables.shipmentVerifiedTime,
            shipmentProcessed: variables.shipmentProcessed,
            shipmentDepartureTime: variables.shipmentDepartureTime,
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
              create: box.destructuredBoxContent.map((content: any) => ({
                id: content.id,
                description: content.description,
                HsCode: content.HsCode,
                quantity: content.quantity,
                unitRate: content.unitRate,
                unitWeight: content.unitWeight,
                total: content.total,
              })),
            },
          })),
        },
      },
    });

    return res.status(200).json({ message: "Shipment edited successfully!" });
  } catch (error) {
    console.error("Error updating shipment:", error);
    return res
      .status(500)
      .json({ message: "Failed to edit shipment", details: error });
  }
};
