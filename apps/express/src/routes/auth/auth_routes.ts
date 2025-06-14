import express from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
import { authMiddleware } from "../../middlewares/auth_middleware";
import { setAuthCookies } from "../../utils/auth_functions";
import { clearAuthCookies } from "../../utils/auth_functions";

const router = express.Router();
const prisma = new PrismaClient();

const loginProps = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/login", async (req, res) => {
  const parsedInput = loginProps.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(400).json({ error: "Failed to parse input" });
  }
  const { email, password } = parsedInput.data;
  const normalizedEmail = email.toLowerCase();

  const userDb = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!userDb) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const passwordValidation = await bcrypt.compare(password, userDb.password);
  if (!passwordValidation) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  setAuthCookies(res, userDb.id, userDb.role, userDb.refreshTokenVersion);
  const userObj = {
    email: userDb.email,
    username: userDb.username,
    url: userDb.url,
  };
  // return res.status(200).json({ message: "Logged in successfully" });
  return res.status(200).json(userObj);
});

router.post("/logout", (req, res) => {
  clearAuthCookies(res);

  res.status(200).json({ message: "Logged out successfully" });
});

router.get("/verify", authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
