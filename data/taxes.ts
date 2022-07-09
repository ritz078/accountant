import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Tax } from "@prisma/client";
import { TaxDraft } from "@/types/tax";

export function useTaxes() {
  const { data, error, mutate } = useSWR<Tax[]>("/api/taxes", fetcher);

  return {
    data,
    error,
    mutate,
  };
}

export function useTax(id?: number) {
  const { data, error } = useSWR<Tax>(id ? `/api/taxes/${id}` : null, fetcher);

  return {
    data,
    error,
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

export async function updateTaxPreset(tax: Tax): Promise<Tax> {
  const res = await fetch(`/api/taxes/${tax.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tax),
  });

  return res.json();
}
