import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Tax } from "@prisma/client";

export function useTaxes() {
  const { data, error } = useSWR<Tax[]>("/api/taxes", fetcher);

  return {
    data,
    error,
  };
}
