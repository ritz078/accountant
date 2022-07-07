import * as Yup from "yup";
import { IInvoice } from "@/types/invoice";
import { Tax } from "@prisma/client";

function getTaxes(originalAmount: number, taxes: Tax[]): number {
  return (
    taxes?.reduce((prev, curr) => {
      if (curr.type === "percentage") {
        return prev + (originalAmount * curr.value) / 100;
      } else {
        return prev + curr.value;
      }
    }, 0) || 0
  );
}

export function getAmount(originalAmount: number, taxes: Tax[]) {
  return originalAmount + getTaxes(originalAmount, taxes);
}

export function getTotalInvoiceAmount(invoice: IInvoice, includeTaxes = true) {
  const sumOfAllItemAmounts = invoice.items.reduce((prev, curr) => {
    return prev + getAmount(curr.unitPrice * curr.quantity, curr.taxes);
  }, 0);

  return (
    sumOfAllItemAmounts +
    (includeTaxes ? getTaxes(sumOfAllItemAmounts, invoice.taxes) : 0)
  );
}

export const schema = Yup.object().shape({
  invoiceNumber: Yup.string().required("Invoice number is required"),
  issueDate: Yup.date().required("Issue date is required"),
  dueDate: Yup.date().required("Due date is required"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Item name is required"),
        quantity: Yup.number().required("Item quantity is required"),
        unitPrice: Yup.number().required("Item unit price is required"),
      })
    )
    .min(1, "At least one item is required")
    .required("Items are required"),
  currencyCode: Yup.string().required("Currency code is required"),
  total: Yup.number().required("Total is required"),
  customerId: Yup.number().required("Customer is required"),
});
