import { NextApiRequest, NextApiResponse } from "next";
import { Customer } from "@prisma/client";
import { prisma } from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | Customer
    | {
        message: string;
      }
  >
) {
  const { id } = req.query;

  if (req.method === "GET") {
    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        address: true,
      },
    });

    if (!customer) {
      res.status(404).json({
        message: "Customer not found",
      });
    } else {
      res.status(200).json(customer);
    }
  }
}
