import type { NextApiRequest, NextApiResponse } from "next";
import { Address, Customer } from "@prisma/client";
import { prisma } from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | (Customer & {
        address: Address;
      })
    | Customer[]
  >
) {
  if (req.method === "POST") {
    const { address, ...customer } = req.body;

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
    const customers = await prisma.customer.findMany({
      include: { address: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(customers);
  } else {
    res.status(404).end();
  }
}
