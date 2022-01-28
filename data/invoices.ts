import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { IInvoice } from "@/types/invoice";

export function useInvoices() {
  const { data, error } = useSWR<IInvoice[]>("/api/invoices", fetcher);

  return {
    data,
    error,
  };
}
