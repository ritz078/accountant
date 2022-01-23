import { ICurrency } from "@/types/currency";

interface ICustomer {
  id: string;
  name: string;
  email?: string;
}

export interface IItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency?: ICurrency;
  quantity: number;
  taxes: ITaxOrDiscount[];
  notes?: string;
}

export interface ITaxOrDiscount {
  id: string;
  type: "percentage" | "fixed";
  name: string;
  value: number;
}

export interface IInvoice {
  id: string;
  createdAt: Date;
  invoiceNumber: string | number;
  issueDate: Date;
  dueDate: Date;
  customer: ICustomer | null;
  notes: string;
  items: IItem[];
  taxes: ITaxOrDiscount[];
  currency: ICurrency;
  total: number;
  status: "draft" | "sent" | "paid";
}
