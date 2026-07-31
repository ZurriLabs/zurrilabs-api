import { Router } from "express";
import prisma from "../lib/prisma";
import { Resend } from "resend";
import { contactEmailTemplate } from "../templates/contactEmail";

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, company, service, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const contact = await prisma.contact.create({
      data: { name, email, phone, company, service, budget, message },
    });

    // Enviar email de notificación (si falla, no rompe el guardado)
    try {
      await resend.emails.send({
        from: "ZURRILABS <onboarding@resend.dev>",
        to: "zurrilabs@gmail.com",
        subject: `Nueva propuesta: ${name}`,
        html: contactEmailTemplate({
          name,
          email,
          phone,
          company,
          service,
          budget,
          message,
        }),
      });
    } catch (emailErr) {
      console.error("Error enviando email:", emailErr);
      // no cortamos la respuesta, el contacto ya se guardó bien
    }

    return res.json({ success: true, contact });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;