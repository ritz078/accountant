import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { IInvoice } from "@/types/invoice";

export function useInvoices() {
  const { data, error, mutate } = useSWR<IInvoice[]>("/api/invoices", fetcher);

  return {
    data,
    error,
    mutate,
  };
}

export async function deleteInvoice(id: number) {
  const res = await fetch(`/api/invoices/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
