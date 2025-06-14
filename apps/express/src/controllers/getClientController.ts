import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getClientController = async (req: Request, res: Response) => {
  try {
    const clientData = await prisma.user.findMany({
      select: {
        company: true,
        id: true,
      },
    });
    console.log(clientData);
    return res.status(200).json(clientData);
  } catch {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
