import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";
import { TaxDraft } from "@/types/tax";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const taxes = await prisma.tax.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(taxes);
  } else if (req.method === "POST") {
    const tax = req.body as TaxDraft;

    const savedTax = await prisma.tax.create({
      data: {
        ...tax,
        updatedAt: new Date(),
      },
    });

    res.status(201).json(savedTax);
  }
}
