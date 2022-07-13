import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";
import { INVOICES_PER_PAGE } from "@/constants/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = "0", limit = INVOICES_PER_PAGE } = req.query as {
    page: string;
    limit: string;
  };

  if (req.method === "GET") {
    const [invoices, count] = await prisma.$transaction([
      prisma.invoice.findMany({
        skip: +page * +limit,
        take: +limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.invoice.count(),
    ]);

    res.status(200).json({
      data: invoices,
      totalCount: count,
    });
  }
}
