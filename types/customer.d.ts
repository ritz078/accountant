import { ICurrency } from "@/components/Select/CurrencySelect";

export interface IAddress {
  line1: string;
  line2: null | string;
  city: string;
  state: string;
  country: string;
  pin: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICustomerNew {
  name: string;
  email: null | string;
  phone: null | string;
  currencyCode: string;
  address: IAddress;
  notes: null | string;
  vatin: null | string;
  gstin: null | string;
}

export interface ICustomer extends ICustomerNew {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
