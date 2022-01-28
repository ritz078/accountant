import { ITaxOrDiscount } from "@/types/invoice";

export interface IItem {
  id: number;
  name: string;
  description?: string;
  unitPrice: number;
  currencyCode: string;
  quantity: number;
  taxes: ITaxOrDiscount[];
  notes?: string;
}
