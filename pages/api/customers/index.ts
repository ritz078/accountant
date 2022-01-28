import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { ICustomer, ICustomerNew } from "@/types/customer";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICustomer | Omit<ICustomer, "address">[]>
) {
  if (req.method === "POST") {
    const { address, ...customer } = req.body as ICustomerNew;

    const customerSaved = await prisma.customer.create({
      data: {
        ...customer,
        updatedAt: new Date(),
        address: {
          create: {
            ...address,
            updatedAt: new Date(),
          },
        },
      },
      include: {
        address: true,
      },
    });

    res.status(200).json(customerSaved);
  } else if (req.method === "GET") {
    const customers = await prisma.customer.findMany();

    res.status(200).json(customers);
  } else {
    res.status(404).end();
  }
}
