import { CustomerDraft, CustomerResponse } from "@/types/customer";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export async function createCustomer(
  customer: CustomerDraft
): Promise<CustomerResponse | undefined> {
  const res = await fetch("/api/customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  return res.json();
}

export function useCustomers() {
  const { data, error } = useSWR<CustomerResponse[]>("/api/customers", fetcher);

  return {
    data,
    error,
  };
}

export function useCustomer(id: string) {
  const { data, error } = useSWR<CustomerResponse>(`/api/customer/${id}`, fetcher);

  return {
    data,
    error,
  };
}
