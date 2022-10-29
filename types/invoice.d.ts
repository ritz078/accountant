import { Invoice, InvoiceItem, Tax } from "@prisma/client";

export type IInvoice = Invoice & {
  items: (InvoiceItem & {
    taxes: Tax[];
  })[];
  taxes: Tax[];
};
