import { z } from "zod";

const consignorConsigneeSchema = z.object({
  company: z.string().min(1, { message: "Company is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  address1: z.string().min(1, { message: "Address1 is required" }),
  address2: z.string(),
  zip: z.string().min(1, { message: "Zip is required" }),

  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),

  phoneNumber: z
    .union([
      z
        .string()
        .regex(/^\d+$/, { message: "PhoneNumber must contain only numbers" }),
      z.number().int().positive(),
    ])
    .transform((val) => val.toString()),

  email: z.string().optional(),
});

const consignorSchema = z.object({
  company: z.string().min(1, { message: "Company is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  address1: z.string().min(1, { message: "Address1 is required" }),
  address2: z.string(),
  zip: z.string().min(1, { message: "Zip is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  phoneNumber: z
    .union([
      z
        .string()
        .regex(/^\d+$/, { message: "PhoneNumber must contain only numbers" })
        .transform((val) => Number(val)),

      z.number().int().positive(),
    ])
    .transform((val) => val.toString())
    .refine((val) => !isNaN(Number(val)), {
      message: "PhoneNumber must be a valid number",
    }),
  email: z.string().optional(),
});

const consigneeSchema = z.object({
  company: z.string().min(1, { message: "Company is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  address1: z.string().min(1, { message: "Address1 is required" }),
  address2: z.string(),
  zip: z.string().min(1, { message: "Zip is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  phoneNumber: z
    .union([
      z
        .string()
        .regex(/^\d+$/, { message: "PhoneNumber must contain only numbers" })
        .transform((val) => Number(val)),

      z.number().int().positive(),
    ])
    .transform((val) => val.toString())
    .refine((val) => !isNaN(Number(val)), {
      message: "PhoneNumber must be a valid number",
    }),
  email: z.string(),
});
const boxesContentSchema = z.object({
  id: z.string().min(1, { message: "Id is required" }),

  // description: z.string().optional(),
  description: z.union([z.string().optional(), z.null()]),
  HsCode: z.string().optional(),
  quantity: z
    .union([z.string(), z.number().int(), z.null()])
    .transform((val) => {
      if (val === null || val === undefined) return undefined;
      if (typeof val === "string") {
        const numberValue = Number(val.trim());
        return isNaN(numberValue) ? val : numberValue;
      }
      return val;
    })
    .optional(),
  // unitRate: z
  //   .union([
  //     z.string().refine((val) => val.trim().length > 0, {
  //       message: "UnitRate is required",
  //     }),
  //     z
  //       .number()

  //       .refine((val) => val !== 0, {
  //         message: "UnitRate cannot be 0",
  //       }),
  //   ])
  //   .transform((val) => {
  //     if (typeof val === "string") {
  //       const numberValue = Number(val.trim());

  //       return isNaN(numberValue) ? val : numberValue;
  //     }

  //     return val;
  //   })
  //   .refine((val) => !isNaN(Number(val)) && Number(val) !== 0, {
  //     message: "UnitRate must be a valid non-zero number",
  //   }),
  unitRate: z
    .union([z.string(), z.number().int(), z.null()])
    .transform((val) => {
      if (val === null || val === undefined) return undefined;
      if (typeof val === "string") {
        const numberValue = Number(val.trim());
        return isNaN(numberValue) ? val : numberValue;
      }
      return val;
    })
    .optional(),
  unitWeight: z
    .union([z.string(), z.number().int(), z.null()])
    .transform((val) => {
      if (val === null || val === undefined) return undefined;
      if (typeof val === "string") {
        const numberValue = Number(val.trim());
        return isNaN(numberValue) ? val : numberValue;
      }
      return val;
    })
    .optional(),

  total: z
    .union([z.string(), z.number().int(), z.null()])
    .transform((val) => {
      if (val === null || val === undefined) return undefined;
      if (typeof val === "string") {
        const numberValue = Number(val.trim());
        return isNaN(numberValue) ? val : numberValue;
      }
      return val;
    })
    .optional(),

  // total: z
  //   .union([
  //     z.string().refine((val) => val.trim().length > 0, {
  //       message: "Total is required",
  //     }),
  //     z
  //       .number()

  //       .refine((val) => val !== 0, {
  //         message: "Total cannot be 0",
  //       }),
  //   ])
  //   .transform((val) => {
  //     if (typeof val === "string") {
  //       const numberValue = Number(val.trim());

  //       return isNaN(numberValue) ? val : numberValue;
  //     }

  //     return val;
  //   })
  //   .refine((val) => !isNaN(Number(val)) && Number(val) !== 0, {
  //     message: "Total must be a valid non-zero number",
  //   }),
});
const boxesSchema = z.object({
  boxAwbNumber: z.string().optional(),
  lengthCm: z
    .union([
      z.string().refine((val) => val.trim().length > 0, {
        message: "LengthCm is required",
      }),
      z
        .number()
        .int()
        .refine((val) => val !== 0, {
          message: "LengthCm cannot be 0",
        }),
    ])
    .refine((val) => !isNaN(Number(val)) && Number(val) !== 0, {
      message: "Zip must be a valid non-zero number",
    }),
  widthCm: z
    .union([
      z.string().refine((val) => val.trim().length > 0, {
        message: "widthCm is required",
      }),
      z
        .number()
        .int()
        .refine((val) => val !== 0, {
          message: "widthCm cannot be 0",
        }),
    ])
    .refine((val) => !isNaN(Number(val)) && Number(val) !== 0, {
      message: "widthcm must be a valid non-zero number",
    }),
  heightCm: z
    .union([
      z.string().refine((val) => val.trim().length > 0, {
        message: "heightCm is required",
      }),
      z
        .number()
        .int()
        .refine((val) => val !== 0, {
          message: "heightCm cannot be 0",
        }),
    ])
    .refine((val) => !isNaN(Number(val)) && Number(val) !== 0, {
      message: "HeightCm must be a valid non-zero number",
    }),
  actualWeightKg: z
    .union([
      z.string().refine((val) => val.trim().length > 0, {
        message: "ActualWeightKG is required",
      }),
      z
        .number()

        .refine((val) => val !== 0, {
          message: "ActualWeightKg cannot be 0",
        }),
    ])
    .refine((val) => !isNaN(Number(val)) && Number(val) !== 0, {
      message: "ActualWeightKg must be a valid non-zero number",
    }),
  volumetricWeightKg: z
    .union([
      z.string().refine((val) => val.trim().length > 0, {
        message: "VolumetricWeightKg is required",
      }),
      z
        .number()

        .refine((val) => val !== 0, {
          message: "VolumetricWeightKg cannot be 0",
        }),
    ])
    .refine((val) => !isNaN(Number(val)) && Number(val) !== 0, {
      message: "VolumetricWeightKg must be a valid non-zero number",
    }),
  chargeableWeightKg: z
    .union([
      z.string().refine((val) => val.trim().length > 0, {
        message: "chargeableWeightKg is required",
      }),
      z
        .number()

        .refine((val) => val !== 0, {
          message: "chargeableWeightKg cannot be 0",
        }),
    ])
    .refine((val) => !isNaN(Number(val)) && Number(val) !== 0, {
      message: "ChargeableWeightKg must be a valid non-zero number",
    }),
  BoxesContent: z.array(boxesContentSchema),
});
const verificationStatusSchema = z.object({
  shipmentVerified: z.boolean().default(false),
  shipmentVerifiedTime: z
    .string()
    .transform((value) => new Date(value))
    .pipe(z.date())
    .optional(),
  shipmentProcessed: z.boolean().default(false).optional(),
  shipmentDepartureTime: z
    .string()
    .transform((value) => new Date(value))
    .pipe(z.date())
    .optional(),
});
export const bookShipmentSchema = z.object({
  id: z.string().min(1, { message: "Id is required" }),

  date: z
    .string()
    .transform((value) => new Date(value))
    .pipe(z.date())
    .optional(),

  division: z.number(),
  totalBoxes: z.number(),
  totalActualWeightKg: z.number(),
  totalVolumetricWeightKg: z.number(),
  totalChargeableWeightKg: z.number(),
  // invoiceTotal: z.number(),
  invoiceTotal: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const num = Number(val);
        return isNaN(num) ? val : num;
      }
      return val;
    },
    z.number({ invalid_type_error: "Invoice total must be a valid number" })
  ),
  contentDescriptions: z.string().optional(),

  awbNumber: z.string().optional(),
  hub: z.string().min(1, { message: "Hub is required" }),
  service: z.string().min(1, { message: "Service is required" }),
  trackingNumber: z.string().optional(),

  consignor: consignorSchema,
  consignee: consigneeSchema,
  boxes: z.array(boxesSchema).min(1, "At least one box is required"),
  verificationStatus: verificationStatusSchema,
  client: z.string().min(1, { message: "Client must be a string" }).optional(),
});
