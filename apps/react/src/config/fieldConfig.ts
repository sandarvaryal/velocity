const fieldConfigs: Record<string, { type: "text" | "number" | "boolean" }> = {
  "consignor.company": { type: "text" },
  "consignor.name": { type: "text" },
  "consignor.country": { type: "text" },
  "consignor.address1": { type: "text" },
  "consignor.address2": { type: "text" },
  "consignor.zip": { type: "text" },
  "consignor.city": { type: "text" },
  "consignor.state": { type: "text" },
  "consignor.phoneNumber": { type: "number" },
  "consignor.email": { type: "text" },

  "consignee.company": { type: "text" },
  "consignee.name": { type: "text" },
  "consignee.country": { type: "text" },
  "consignee.address1": { type: "text" },
  "consignee.address2": { type: "text" },
  "consignee.zip": { type: "text" },
  "consignee.city": { type: "text" },
  "consignee.state": { type: "text" },
  "consignee.phoneNumber": { type: "number" },
  "consignee.email": { type: "text" },

  awbNumber: { type: "text" },
  hub: { type: "text" },
  service: { type: "text" },

  "boxes.boxAwbNumber": { type: "text" },
  "boxes.lengthCm": { type: "number" },
  "boxes.widthCm": { type: "number" },
  "boxes.heightCm": { type: "number" },
  "boxes.actualWeightKg": { type: "number" },
  "boxes.volumetricWeightKg": { type: "number" },
  "boxes.chargeableWeightKg": { type: "number" },

  "boxes.BoxesContent.description": { type: "text" },
  "boxes.BoxesContent.HsCode": { type: "text" },
  "boxes.BoxesContent.quantity": { type: "number" },
  "boxes.BoxesContent.unitRate": { type: "number" },
  "boxes.BoxesContent.unitWeight": { type: "number" },
  "boxes.BoxesContent.total": { type: "number" },

  "verificationStatus.shipmentVerified": { type: "boolean" },
};

export default fieldConfigs;
