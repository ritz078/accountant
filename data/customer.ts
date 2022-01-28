import { ICustomer, ICustomerNew } from "@/types/customer";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

export async function createCustomer(
  customer: ICustomerNew
): Promise<ICustomer | undefined> {
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
  const { data, error } = useSWR<ICustomer[]>("/api/customers", fetcher);

  return {
    data,
    error,
  };
}

export function useCustomer(id: string) {
  const { data, error } = useSWR<ICustomer>(`/api/customer/${id}`, fetcher);

  return {
    data,
    error,
  };
}
