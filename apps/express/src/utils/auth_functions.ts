import { __prod__ } from "../constants";
import { Response } from "express";
import jwt from "jsonwebtoken";

export const cookieOpts = {
  httpOnly: false,
  // secure: __prod__,
  // secure: false,
  secure: false,
  sameSite: "lax",
  path: "/",
  domain: __prod__ ? `.${process.env.DOMAIN}` : "",
  // domain: `${process.env.FRONTEND_URL}`,
  maxAge: 1000 * 60 * 60 * 24 * 365,
} as const;

export const setAuthCookies = (
  res: Response,
  id: string,
  role: string,
  refreshTokenVersion: number
) => {
  const accessToken = jwt.sign(
    { id, role },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15min" }
  );

  const refreshToken = jwt.sign(
    { id, refreshTokenVersion },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "30d" }
  );
  res.cookie("id", accessToken, cookieOpts);
  res.cookie("rid", refreshToken, cookieOpts);
};

export const setAccess = (res: Response, id: string, role: string) => {
  const accessToken = jwt.sign(
    { id, role },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15min" }
  );

  res.cookie("id", accessToken, cookieOpts);
};

export const clearAuthCookies = (res: Response) => {
  const { maxAge, ...cookieOptions } = cookieOpts;

  res.clearCookie("id", cookieOptions);
  res.clearCookie("rid", cookieOptions);
};
