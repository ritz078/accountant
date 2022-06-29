import { CustomerDraft, CustomerResponse } from "@/types/customer";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export async function createCustomer(
  customer: CustomerDraft
): Promise<CustomerResponse | undefined> {
  const res = await fetch("/api/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  return res.json();
}

export function useCustomers() {
  const { data, error, mutate } = useSWR<CustomerResponse[]>(
    "/api/customers",
    fetcher
  );

  return {
    data,
    error,
    mutate,
  };
}

export function useCustomer(id: string) {
  const { data, error } = useSWR<CustomerResponse>(
    `/api/customers/${id}`,
    fetcher
  );

  return {
    data,
    error,
  };
}

export async function deleteCustomer(id: number) {
  const res = await fetch(`/api/customers/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
