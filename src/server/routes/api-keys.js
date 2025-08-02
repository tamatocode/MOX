import express from "express";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

const router = express.Router();

router.post("/", async (req, res) => {
  const apiKey = randomBytes(32).toString("hex");
  const clientId = randomBytes(16).toString("hex");
  const clientSecret = randomBytes(32).toString("hex");

  const key = await prisma.apiKey.create({
    data: {
      key: apiKey,
      clientId,
      clientSecret,
      merchantId: 1, // Replace with dynamic ID
    },
  });

  res.json(key);
});

export default router;