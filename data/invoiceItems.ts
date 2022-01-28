import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { IItem } from "@/types/api/item";

export function useInvoiceItems() {
  const { data, error } = useSWR<IItem[]>("/api/invoice-items", fetcher);

  return {
    data,
    error,
  };
}
