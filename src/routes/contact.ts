import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        company,
        service,
        budget,
        message,
      },
    });

    return res.json({
      success: true,
      contact,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;