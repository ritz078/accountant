import { Customer, Address } from "@prisma/client";

export type CustomerResponse = Customer & { address: Address };

export type CustomerDraft = Omit<
  Customer & { address: Omit<Address, "id" | "createdAt" | "updatedAt"> },
  "id" | "createdAt" | "updatedAt" | "addressId"
>;
