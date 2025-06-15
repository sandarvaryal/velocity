import { Request, Response, NextFunction } from "express";
import { AccessTokenData, RefreshTokenData } from "../types";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { cookieOpts } from "../utils/auth_functions";
import { setAccess } from "../utils/auth_functions";

const prisma = new PrismaClient();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: accessToken, rid: refreshToken } = req.cookies;

    if (accessToken) {
      try {
        const user = jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET as string
        ) as AccessTokenData;
        req.user = user;
        return next();
      } catch (error: any) {}
    }

    if (!refreshToken) {
      return res.status(401).json({ message: "UNAUTHORIZED 1" });
    }

    let refreshTokenData: RefreshTokenData;
    try {
      refreshTokenData = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as RefreshTokenData;
    } catch (error: any) {
      console.error("Refresh token verification failed:", error.message);
      return res.status(401).json({ message: "UNAUTHORIZED 2" });
    }

    const userDb = await prisma.user.findUnique({
      where: { id: refreshTokenData.id },
    });

    if (
      !userDb ||
      refreshTokenData.refreshTokenVersion !== userDb.refreshTokenVersion
    ) {
      return res.status(401).json({ message: "UNAUTHORIZED 3" });
    }

    // const newAccessToken = jwt.sign(
    //   { id: refreshTokenData.id },
    //   process.env.ACCESS_TOKEN_SECRET as string,
    //   { expiresIn: "15min" }
    // );
    setAccess(res, refreshTokenData.id, userDb.role);

    // res.cookie("id", newAccessToken, cookieOpts);
    req.user = { id: refreshTokenData.id, role: userDb.role };

    next();
  } catch (error: any) {
    console.error("Authentication error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
