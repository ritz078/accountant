import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const invoiceItems = await prisma.invoiceItem.findMany({
      include: {
        taxes: true,
      },
    });

    res.status(200).json(invoiceItems);
  }
}
