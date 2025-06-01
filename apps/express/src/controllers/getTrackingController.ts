// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import { z } from "zod";
// import axios from "axios";

// const prisma = new PrismaClient();

// const awbNumberSchema = z.object({
//   awbNumber: z.string().min(1, { message: "Invalid trackingNumber" }),
// });

// export const getTrackingController = async (req: Request, res: Response) => {
//   const data = awbNumberSchema.safeParse(req.params);

//   if (!data.success) {
//     return res.status(400).json({
//       message: "Invalid params",
//       errors: data.error.format(),
//     });
//   }
//   const awbNumber = data.data.awbNumber;
//   console.log(awbNumber);

//   const shipment = await prisma.shipment.findFirst({
//     where: {
//       awbNumber: awbNumber,
//     },
//     include: {
//       verificationStatus: true,
//     },
//   });
//   if (!shipment) {
//     return res
//       .status(404)
//       .json({ message: "No Shipment with given awbNumber" });
//   }

//   if (!shipment.trackingId) {
//     return res
//       .status(200)
//       .json({ verificationStatus: shipment.verificationStatus });
//   }

//   const shipmentId = shipment.trackingId;
//   try {
//     const { data } = await axios.get(
//       `https://api.aftership.com/tracking/2025-01/trackings/${shipmentId}`,
//       {
//         headers: {
//           "as-api-key": process.env.AS_API_KEY,
//         },
//       }
//     );
//     return res
//       .status(200)
//       .json({ data, verificationStatus: shipment.verificationStatus });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

//eta bata

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import axios from "axios";

const prisma = new PrismaClient();

const awbNumberSchema = z.object({
  awbNumber: z.string().min(1, { message: "Invalid trackingNumber" }),
});

export const getTrackingController = async (req: Request, res: Response) => {
  const data = awbNumberSchema.safeParse(req.params);

  if (!data.success) {
    return res.status(400).json({
      message: "Invalid params",
      errors: data.error.format(),
    });
  }
  const awbNumber = data.data.awbNumber;
  console.log(awbNumber);

  try {
    const shipment = await prisma.shipment.findFirst({
      where: {
        awbNumber: awbNumber,
      },
      include: {
        verificationStatus: true,
      },
    });
    if (!shipment) {
      return res
        .status(404)
        .json({ message: "No Shipment with given awbNumber" });
    }
    return res.status(200).json({
      data: shipment.dataObj,
      verificationStatus: shipment.verificationStatus,
      bookingDate: shipment.date,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  // if (!shipment.trackingId) {
  //   return res
  //     .status(200)
  //     .json({ verificationStatus: shipment.verificationStatus });
  // }

  // const shipmentId = shipment.trackingId;
  // try {
  //   const { data } = await axios.get(
  //     `https://api.aftership.com/tracking/2025-01/trackings/${shipmentId}`,
  //     {
  //       headers: {
  //         "as-api-key": process.env.AS_API_KEY,
  //       },
  //     }
  //   );
  //   return res
  //     .status(200)
  //     .json({ data, verificationStatus: shipment.verificationStatus });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ message: "Internal Server Error" });
  // }
};
