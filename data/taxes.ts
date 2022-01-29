import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Tax } from "@prisma/client";
import { TaxDraft } from "@/types/tax";

export function useTaxes() {
  const { data, error, mutate } = useSWR<Tax[]>("/api/taxes", fetcher);

  return {
    data,
    error,
    mutate
  };
}

export async function createTaxPreset(tax: TaxDraft): Promise<Tax | undefined> {
  const res = await fetch("/api/taxes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tax),
  });

  return res.json();
}
