import { Request, Response, NextFunction } from "express";
import { AccessTokenData, RefreshTokenData } from "../types";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { cookieOpts } from "../utils/auth_functions";
import { setAccess } from "../utils/auth_functions";

const prisma = new PrismaClient();

export const superAdminMiddleware = async (
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

        if (user.role !== "superAdmin") {
          return res
            .status(403)
            .json({ message: "Forbidden: UNAUTHORIZED eta" });
        }

        req.user = user;
        return next();
      } catch (error: any) {}
    }

    if (!refreshToken) {
      return res.status(401).json({ message: "UNAUTHORIZED eta" });
    }

    let refreshTokenData: RefreshTokenData;
    try {
      refreshTokenData = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as RefreshTokenData;
    } catch (error: any) {
      console.error("Refresh token verification failed:", error.message);
      return res.status(401).json({ message: "UNAUTHORIZED uta" });
    }

    const userDb = await prisma.user.findUnique({
      where: { id: refreshTokenData.id },
      select: { role: true, refreshTokenVersion: true },
    });

    if (
      !userDb ||
      refreshTokenData.refreshTokenVersion !== userDb.refreshTokenVersion
    ) {
      return res.status(401).json({ message: "UNAUTHORIZED hehe" });
    }

    if (userDb.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: UNAUTHORIZED" });
    }

    // const newAccessToken = jwt.sign(
    //   { id: refreshTokenData.id, role: userDb.role },
    //   process.env.ACCESS_TOKEN_SECRET as string,
    //   { expiresIn: "15min" }
    // );

    // res.cookie("id", newAccessToken, cookieOpts);
    setAccess(res, refreshTokenData.id, userDb.role);
    req.user = { id: refreshTokenData.id, role: userDb.role };

    next();
  } catch (error: any) {
    console.error("Authentication error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
