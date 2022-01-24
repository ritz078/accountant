import { ICurrency } from "@/components/Select/CurrencySelect";

export interface IAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  pin: string;
}

export interface ICustomerNew {
  name: string;
  email: string;
  phone: string;
  currencyCode: string;
  address: IAddress;
  notes: undefined | string;
  vatin: undefined | string;
  gstin: undefined | string;
}

export interface ICustomer extends ICustomerNew {
  id: number;
}
