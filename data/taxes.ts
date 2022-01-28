import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { ITaxOrDiscount } from "@/types/invoice";

export function useTaxes() {
  const { data, error } = useSWR<ITaxOrDiscount[]>("/api/taxes", fetcher);

  return {
    data,
    error,
  };
}
