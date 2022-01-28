import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { InvoiceItem } from "@prisma/client";

export function useInvoiceItems() {
  const { data, error } = useSWR<InvoiceItem[]>("/api/invoice-items", fetcher);

  return {
    data,
    error,
  };
}
