import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// const bodySchema = z.object({
//   id: z.number().min(1, { message: "Id is required" }),
// });

export const getBlogController = async (req: Request, res: Response) => {
  //   const data = bodySchema.safeParse(req.query);

  //   if (!data.success) {
  //     return res.status(400).json({
  //       message: "Invalid params",
  //       errors: data.error.format(),
  //     });
  //   }
  //   const id = data.data.id;

  try {
    const blog = await prisma.blog.findMany();

    if (!blog) {
      return res.status(404).json({ message: "Blog Not Found" });
    }
    return res.status(200).json({ blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
