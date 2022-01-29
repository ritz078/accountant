import { Tax } from "@prisma/client";

export type TaxDraft = Omit<Tax, "id" | "createdAt" | "updatedAt">;
