// import express from "express";
// import { superAdminMiddleware } from "../../middlewares/superAdminMiddleware";
// import { z } from "zod";
// import bcrypt from "bcrypt";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// const router = express.Router();

// const userIdSchema = z.object({
//   userId: z.string().uuid({ message: "Invalid user ID format" }),
// });
// const userRoleSchema = z.object({
//   role: z.enum(["superAdmin", "admin"]),
// });

// const registerProps = z.object({
//   email: z.string().email(),
//   username: z.string(),
//   password: z.string(),
//   phone: z.string(),
//   role: z.enum(["admin", "superAdmin"]),
// });

// router.get("/getUsers", superAdminMiddleware, async (req, res) => {
//   try {
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         email: true,
//         username: true,
//         role: true,
//         phone: true,
//       },
//     });

//     return res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// router.delete("/deleteUser/:userId", superAdminMiddleware, async (req, res) => {
//   const validationResult = userIdSchema.safeParse(req.params);
//   if (!validationResult.success) {
//     return res.status(400).json({ message: "Invalid or missing Account Id" });
//   }
//   const { userId } = validationResult.data;

//   try {
//     const deletedInstance = await prisma.user.delete({
//       where: {
//         id: userId,
//       },
//     });

//     if (!deletedInstance) {
//       return res.status(404).json({ message: "Account not found" });
//     }
//     return res.status(200).json({ message: "Account deleted" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// router.put(
//   "/changeAccountRole/:userId",
//   superAdminMiddleware,
//   async (req, res) => {
//     const validationResultParam = userIdSchema.safeParse(req.params);

//     const validationResultBody = userRoleSchema.safeParse(req.body);
//     if (!validationResultParam.success) {
//       return res.status(400).json({ message: "Invalid or missing Account Id" });
//     }
//     console.log(validationResultBody);
//     if (!validationResultBody.success) {
//       return res.status(400).json({ message: "Invalid or missing Role" });
//     }

//     const { userId } = validationResultParam.data;
//     const { role } = validationResultBody.data;

//     try {
//       if (role === "admin") {
//         const isAnySuperAdmin = await prisma.user.findMany({
//           where: { role: "superAdmin" },
//         });
//         if (isAnySuperAdmin.length <= 1) {
//           return res
//             .status(400)
//             .json({ message: "Cannot Delete All SuperAdmins" });
//         }
//       }

//       await prisma.user.update({
//         where: { id: userId },
//         data: {
//           role,
//         },
//       });
//       return res
//         .status(200)
//         .json({ message: "Account's role edited successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
// );

// router.post("/register", superAdminMiddleware, async (req, res) => {
//   console.log(req.body);
//   const parsedInput = registerProps.safeParse(req.body);
//   console.log(parsedInput);
//   if (!parsedInput.success && !parsedInput.data) {
//     return res.status(400).json({ message: "Failed to parse input" });
//   }

//   const { email, username, password, phone, role } = parsedInput.data;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const normalizedEmail = email.toLowerCase();

//   const extinguishUser = await prisma.user.findUnique({
//     where: {
//       email: normalizedEmail,
//     },
//   });
//   if (extinguishUser) {
//     return res.status(403).json({
//       message: "Email already in use",
//     });
//   }
//   await prisma.user.create({
//     data: {
//       email: normalizedEmail,
//       username,
//       password: hashedPassword,
//       phone,
//       role,
//     },
//   });

//   return res.status(200).json({ message: "Account created successfully" });
// });

// router.get("/verify", superAdminMiddleware, (req, res) => {
//   res.status(200).json(req.user);
// });

// export default router;

//eta bata

import express from "express";
import { superAdminMiddleware } from "../../middlewares/superAdminMiddleware";
import { z } from "zod";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = express.Router();

const userIdSchema = z.object({
  userId: z.string().uuid({ message: "Invalid user ID format" }),
});
const userRoleSchema = z.object({
  role: z.enum(["superAdmin", "admin"]),
});

const registerProps = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  phone: z.string(),
  role: z.enum(["admin", "superAdmin"]),
  company: z.string(),
  country: z.string(),
  zip: z.string(),
  state: z.string(),
  city: z.string(),
});

router.get("/getUsers", superAdminMiddleware, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        phone: true,
      },
    });

    return res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/deleteUser/:userId", superAdminMiddleware, async (req, res) => {
  const validationResult = userIdSchema.safeParse(req.params);
  if (!validationResult.success) {
    return res.status(400).json({ message: "Invalid or missing Account Id" });
  }
  const { userId } = validationResult.data;
  if (userId === process.env.DEXERA_ID || userId === process.env.NEXUS_ID) {
    return res.status(400).json({ message: "Cannot Delete This Account" });
  }

  try {
    const deletedInstance = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    if (!deletedInstance) {
      return res.status(404).json({ message: "Account not found" });
    }
    return res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put(
  "/changeAccountRole/:userId",
  superAdminMiddleware,
  async (req, res) => {
    const validationResultParam = userIdSchema.safeParse(req.params);

    const validationResultBody = userRoleSchema.safeParse(req.body);
    if (!validationResultParam.success) {
      return res.status(400).json({ message: "Invalid or missing Account Id" });
    }
    console.log(validationResultBody);
    if (!validationResultBody.success) {
      return res.status(400).json({ message: "Invalid or missing Role" });
    }

    const { userId } = validationResultParam.data;
    const { role } = validationResultBody.data;
    if (userId === process.env.DEXERA_ID || userId === process.env.NEXUS_ID) {
      return res.status(400).json({ message: "Cannot Edit This Account" });
    }

    try {
      if (role === "admin") {
        const isAnySuperAdmin = await prisma.user.findMany({
          where: { role: "superAdmin" },
        });
        if (isAnySuperAdmin.length <= 1) {
          return res
            .status(400)
            .json({ message: "Cannot Delete All SuperAdmins" });
        }
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          role,
        },
      });
      return res
        .status(200)
        .json({ message: "Account's role edited successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post("/register", superAdminMiddleware, async (req, res) => {
  console.log(req.body);
  const parsedInput = registerProps.safeParse(req.body);
  console.log(parsedInput);
  if (!parsedInput.success || !parsedInput.data) {
    return res.status(400).json({ message: "Failed to parse input" });
  }

  const {
    email,
    username,
    password,
    phone,
    role,
    company,
    country,
    zip,
    state,
    city,
  } = parsedInput.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const normalizedEmail = email.toLowerCase();

  const existingUser = await prisma.user.findFirst({
    where: {
      email: normalizedEmail,
    },
  });
  if (existingUser) {
    return res.status(403).json({
      error: "Email already in use",
    });
  }

  await prisma.user.create({
    data: {
      email: normalizedEmail,
      username,
      password: hashedPassword,
      phone,
      role,
      company,
      country,
      zip,
      state,
      city,
    },
  });

  return res.status(200).json({ message: "Account created successfully" });
});

router.get("/verify", superAdminMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
