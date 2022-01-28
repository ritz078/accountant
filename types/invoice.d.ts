import { IItem } from "@/types/api/item";
import { ICustomer } from "@/types/customer";

export interface ITaxOrDiscount {
  id: number;
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
  customerId: number;
  notes: string;
  items: IItem[];
  taxes: ITaxOrDiscount[];
  currencyCode: string;
  total: number;
  status: "draft" | "sent" | "paid";
}
