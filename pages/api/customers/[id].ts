import { NextApiRequest, NextApiResponse } from "next";
import { Customer } from "@prisma/client";
import { prisma } from "@/utils/prisma";
import { invariant } from "@/utils/invariant";

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
  } else if (req.method === "DELETE") {
    try {
      const deletedCustomer = await prisma.customer.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json(deletedCustomer);
    } catch (error) {
      invariant(error instanceof Error, "Customer not found");

      res.status(404).json({
        message: error.message,
      });
    }
  } else if (req.method === "PUT") {
    try {
      const { address, ...customer } = req.body;

      const updatedCustomer = await prisma.customer.update({
        where: {
          id: Number(id),
        },
        data: customer,
      });

      const updatedAddress = await prisma.address.update({
        where: { id: customer.addressId },
        data: address,
      });

      res.status(200).json({ ...updatedCustomer, ...updatedAddress });
    } catch (e) {
      invariant(e instanceof Error, "Customer not updated");

      res.status(404).json({
        message: e.message,
      });
    }
  }
}
