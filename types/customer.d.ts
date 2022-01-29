import { Customer, Address } from "@prisma/client";

export type CustomerDraft = Omit<Customer, "id", "createdAt", "updatedAt">;

export type CustomerResponse = Customer & { address: Address };
