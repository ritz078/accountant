import { ITaxOrDiscount } from "@/types/invoice";

export interface IItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  currencyCode?: string;
  quantity: number;
  taxes: ITaxOrDiscount[];
  notes?: string;
}
