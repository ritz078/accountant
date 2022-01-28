import type { NextApiRequest, NextApiResponse } from "next";
import { IMetaResponse } from "@/types/api/meta";
import { prisma } from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IMetaResponse>
) {
  const currencies = await prisma.currency.findMany();

  res.status(200).json({ currencies });
}
