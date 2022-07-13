import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { IInvoice } from "@/types/invoice";
import { INVOICES_PER_PAGE } from "@/constants/config";

export function useInvoices(pageIndex = 0) {
  const { data, error, mutate } = useSWR<{
    data: IInvoice[];
    totalCount: number;
  }>(`/api/invoices?page=${pageIndex}&limit=${INVOICES_PER_PAGE}`, fetcher);

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

export async function createInvoice(invoice: IInvoice) {
  const res = await fetch("/api/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  });

  return res.json();
}

export async function updateInvoice(invoice: IInvoice) {
  const res = await fetch(`/api/invoices/${invoice.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  });

  return res.json();
}

export function useInvoice(id: number) {
  const { data, error, mutate } = useSWR<IInvoice>(
    `/api/invoices/${id}`,
    fetcher
  );

  return {
    data,
    error,
    mutate,
  };
}
