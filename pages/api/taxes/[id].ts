import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";
import { invariant } from "@/utils/invariant";
import { Tax } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const tax = await prisma.tax.findUnique({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json(tax);
    } catch (error) {
      invariant(error instanceof Error, "Tax not found");

      res.status(404).json({
        message: error.message,
      });
    }
  } else if (req.method === "PUT") {
    try {
      const tax = req.body as Tax;

      const updatedTax = await prisma.tax.update({
        where: {
          id: Number(id),
        },
        data: tax,
      });

      res.status(200).json(updatedTax);
    } catch (error) {
      invariant(error instanceof Error, "Tax not found");

      res.status(404).json({
        message: error.message,
      });
    }
  }
}
