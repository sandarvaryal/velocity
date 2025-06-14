// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import { z } from "zod";
// import { sendEmailOnDelivered } from "../utils/sendEmailOnDelivered";

// const prisma = new PrismaClient();

// const paramSchema = z.object({
//   id: z.string().uuid({ message: "Invalid shipment id" }),
// });
// const bodySchema = z.object({
//   delivered: z.boolean({ message: "Invalid value" }),
// });

// export const editDeliveredController = async (req: Request, res: Response) => {
//   const data = paramSchema.safeParse(req.params);
//   const body = bodySchema.safeParse(req.body);

//   const role = req.user?.role;
//   if (role !== "superAdmin") {
//     return res.status(200).json({ message: "Unauthorized" });
//   }

//   if (!data.success) {
//     return res.status(400).json({
//       message: "Invalid params",
//       errors: data.error.format(),
//     });
//   }
//   if (!body.success) {
//     return res.status(400).json({
//       message: "Invalid status data",
//       errors: body.error.format(),
//     });
//   }
//   const id = data.data.id;
//   const deliveredStatus = body.data.delivered;

//   try {
//     const editedShipment = await prisma.shipment.update({
//       where: {
//         id,
//       },
//       data: {
//         verificationStatus: {
//           update: {
//             shipmentDelivered: deliveredStatus,
//           },
//         },
//       },
//       include: {
//         consignee: {
//           select: {
//             email: true,
//           },
//         },
//       },
//     });

//     if (deliveredStatus && editedShipment?.consignee?.email) {
//       sendEmailOnDelivered(
//         editedShipment.consignee.email,
//         editedShipment.awbNumber
//       );
//       try {
//         const currentDate = new Date();
//         await prisma.shipment.update({
//           where: {
//             id,
//           },
//           data: {
//             verificationStatus: {
//               update: {
//                 shipmentDeliveredTime: currentDate,
//               },
//             },
//           },
//         });
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server Error" });
//       }
//     } else {
//       try {
//         await prisma.shipment.update({
//           where: {
//             id,
//           },
//           data: {
//             verificationStatus: {
//               update: {
//                 shipmentDeliveredTime: null,
//               },
//             },
//           },
//         });
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server Error" });
//       }
//     }

//     return res.status(200).json({ message: "Shipment updated" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

//eta bata

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
// import { sendEmailOnDelivered } from "../utils/sendEmailOnDelivered";

const prisma = new PrismaClient();

const paramSchema = z.object({
  id: z.string().uuid({ message: "Invalid shipment id" }),
});
const bodySchema = z.object({
  delivered: z.boolean({ message: "Invalid value" }),
});

export const editDeliveredController = async (req: Request, res: Response) => {
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
  const deliveredStatus = body.data.delivered;
  console.log(deliveredStatus);

  try {
    const editedShipment = await prisma.shipment.update({
      where: {
        id: id,
      },
      data: {
        verificationStatus: {
          update: {
            shipmentDelivered: deliveredStatus,
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

    if (deliveredStatus && editedShipment?.consignee?.email) {
      // sendEmailOnDelivered(
      //   editedShipment.consignee.email,
      //   editedShipment.awbNumber
      // );
      try {
        const currentDate = new Date();
        await prisma.shipment.update({
          where: {
            id,
          },
          data: {
            verificationStatus: {
              update: {
                shipmentDeliveredTime: currentDate,
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
                shipmentDeliveredTime: null,
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
