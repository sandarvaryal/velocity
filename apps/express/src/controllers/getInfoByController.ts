import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import axios from "axios";

const prisma = new PrismaClient();

const infoProps = z.object({
  country: z.string(),
  postalCode: z.string(),
});

export const getInfoByController = async (req: Request, res: Response) => {
  const parsedInput = infoProps.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(400).json({ error: "Failed to parse input" });
  }

  const { country: countryString, postalCode } = parsedInput.data;

  const countryCode = countryString.slice(
    countryString.indexOf("[") + 1,
    countryString.indexOf("]")
  );
  const country = countryString.slice(countryString.indexOf("]") + 1).trim();

  try {
    const { data: dataPrimary } = await axios.get(
      `https://secure.geonames.org/postalCodeSearchJSON?postalcode=${postalCode}&country=${countryCode}&username=yesyes`
    );

    res.status(200).json({
      dataPrimary: dataPrimary.postalCodes,
    });
  } catch {
    (e: any) => {
      console.error(e);
    };
  }
};
