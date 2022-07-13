import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const invoiceItems = await prisma.invoiceItem.findMany({
      include: {
        taxes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(invoiceItems);
  }
}
