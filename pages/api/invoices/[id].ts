import { NextApiRequest, NextApiResponse } from "next";
import { invariant } from "@/utils/invariant";
import { prisma } from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await prisma.invoice.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json({ message: "Invoice deleted" });
    } catch (error) {
      invariant(error instanceof Error, "Invoice not found");
      res.status(500).json({ message: error.message });
    }
  }
}
