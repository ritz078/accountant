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
  } else if (req.method === "GET") {
    try {
      const invoice = await prisma.invoice.findUnique({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json(invoice);
    } catch (error) {
      invariant(error instanceof Error, "Invoice not found");
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const invoice = await prisma.invoice.create({
        data: {
          ...req.body,
        },
      });

      res.status(200).json(invoice);
    } catch (error) {
      invariant(error instanceof Error, "Invoice not created");
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const invoice = await prisma.invoice.update({
        where: {
          id: Number(id),
        },
        data: {
          ...req.body,
        },
      });

      res.status(200).json(invoice);
    } catch (error) {
      invariant(error instanceof Error, "Invoice not updated");
      res.status(500).json({ message: error.message });
    }
  }
}
