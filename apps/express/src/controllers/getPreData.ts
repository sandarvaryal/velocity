import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getPreDataController = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const userData = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      company: true,
      country: true,
      zip: true,
      state: true,
      city: true,
      email: true,
      phone: true,
    },
  });
  if (!userData) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(userData);
};
