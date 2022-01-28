import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { ICustomer } from "@/types/customer";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | ICustomer
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
