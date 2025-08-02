import express from "express";
import { prisma } from "@/lib/prisma";

const router = express.Router();

router.get("/", async (req, res) => {
  const transactions = await prisma.transaction.findMany();
  res.json(transactions);
});

export default router;