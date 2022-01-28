import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { IMetaResponse } from "@/types/api/meta";

export function useMeta() {
  const { data, error } = useSWR<IMetaResponse>("/api/meta", fetcher);

  return {
    data,
    error,
  };
}
