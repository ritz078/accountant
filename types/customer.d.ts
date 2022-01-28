import { Customer } from "@prisma/client";

export type CustomerDraft = Omit<Customer, "id", "createdAt", "updatedAt">




