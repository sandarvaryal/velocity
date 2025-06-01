import { v4 as uuidv4 } from "uuid";

export const destructureShipmentData = (shipment: any, isBooking: boolean) => {
  const {
    awbNumber,
    hub,
    service,
    trackingNumber,

    division,
    totalBoxes,
    totalActualWeightKg,
    totalVolumetricWeightKg,
    totalChargeableWeightKg,
    invoiceTotal,
    contentDescriptions,

    consignor,
    consignee,
    boxes,
    verificationStatus,
  } = shipment.data;
  const date = isBooking ? new Date() : shipment.data.date;
  //experiment ShipmentId
  const id = isBooking ? uuidv4() : shipment.data.id;
  //
  const {
    company: consignorCompany,
    name: consignorName,
    country: consignorCountry,
    address1: consignorAddress1,
    address2: consignorAddress2,
    zip: consignorZip,
    city: consignorCity,
    state: consignorState,
    phoneNumber: consignorPhoneNumber,
    email: consignorEmail,
  } = consignor;

  const {
    company: consigneeCompany,
    name: consigneeName,
    country: consigneeCountry,
    address1: consigneeAddress1,
    address2: consigneeAddress2,
    zip: consigneeZip,
    city: consigneeCity,
    state: consigneeState,
    phoneNumber: consigneePhoneNumber,
    email: consigneeEmail,
  } = consignee;

  const destructuredBoxes = boxes.map((box: any) => {
    const {
      boxAwbNumber,
      lengthCm,
      widthCm,
      heightCm,
      actualWeightKg,
      volumetricWeightKg,
      chargeableWeightKg,
      BoxesContent,
    } = box;

    const destructuredBoxContent = BoxesContent.map((box: any) => {
      const {
        id,
        description,
        HsCode,
        quantity,
        unitType,
        unitRate,
        unitWeight,
        total,
      } = box;
      return {
        id,
        description,
        HsCode,
        quantity,
        unitType,
        unitRate,
        unitWeight,
        total,
      };
    });

    return {
      boxAwbNumber,
      lengthCm,
      widthCm,
      heightCm,
      actualWeightKg,
      volumetricWeightKg,
      chargeableWeightKg,
      destructuredBoxContent,
    };
  });

  const {
    shipmentVerified,
    shipmentVerifiedTime,
    shipmentProcessed,
    shipmentDepartureTime,
  } = verificationStatus;

  const currentTime = shipmentVerified ? new Date() : null;
  const processedStatus = shipmentVerified ? true : shipmentProcessed;

  return {
    id,

    date,
    awbNumber,
    hub,
    service,
    trackingNumber,
    division,
    totalBoxes,
    totalActualWeightKg,
    totalVolumetricWeightKg,
    totalChargeableWeightKg,
    invoiceTotal,
    contentDescriptions,

    consignorCompany,
    consignorName,
    consignorCountry,
    consignorAddress1,
    consignorAddress2,
    consignorZip,
    consignorCity,
    consignorState,
    consignorPhoneNumber,
    consignorEmail,

    consigneeCompany,
    consigneeName,
    consigneeCountry,
    consigneeAddress1,
    consigneeAddress2,
    consigneeZip,
    consigneeCity,
    consigneeState,
    consigneePhoneNumber,
    consigneeEmail,

    destructuredBoxes,

    shipmentVerified,
    shipmentVerifiedTime: shipmentVerifiedTime || currentTime,
    shipmentProcessed: processedStatus,
    shipmentDepartureTime,
  };
};
