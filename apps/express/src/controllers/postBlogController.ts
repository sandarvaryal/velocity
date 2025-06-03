import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const bodySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export const postBlogController = async (req: Request, res: Response) => {
  const blog = bodySchema.safeParse(req.body);

  if (!blog.success) {
    return res
      .status(400)
      .json({ message: "Invalid data", details: blog.error.errors });
  }

  const { title, description } = blog.data;

  const dateAdded = new Date();
  try {
    const data = await prisma.blog.create({
      data: {
        title,
        description,
        dateAdded,
      },
    });
    return res.status(200).json({ message: "Blog Successfully Created" });
  } catch (e: any) {
    console.error(e);
    res.status(400).json({ error: e.errors });
  }
};
