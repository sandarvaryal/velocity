import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getPreDataController = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const preUserData = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      username: true,
      company: true,
      country: true,
      zip: true,
      state: true,
      city: true,
      email: true,
      phone: true,
      address1: true,
    },
  });
  if (!preUserData) {
    return res.status(404).json({ message: "User not found" });
  }
  const { username, ...rest } = preUserData;
  const userData = { name: username, ...rest };
  // return res.status(200).json(userData);
  return res.status(200).json(userData);
};
