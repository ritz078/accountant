import { IInvoice, ITaxOrDiscount } from "../pages/create-invoice";
import * as Yup from "yup";

function getTaxes(originalAmount: number, taxes: ITaxOrDiscount[]): number {
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

export function getAmount(originalAmount: number, taxes: ITaxOrDiscount[]) {
  return originalAmount + getTaxes(originalAmount, taxes);
}

export function getTotalInvoiceAmount(invoice: IInvoice, includeTaxes = true) {
  const sumOfAllItemAmounts = invoice.items.reduce((prev, curr) => {
    return prev + getAmount(curr.price * curr.quantity, curr.taxes);
  }, 0);

  return (
    sumOfAllItemAmounts +
    (includeTaxes ? getTaxes(sumOfAllItemAmounts, invoice.taxes) : 0)
  );
}

export const schema = Yup.object().shape({
  invoiceNumber: Yup.string().required("Invoice number is required"),
  issueDate: Yup.date().required("Required"),
  dueDate: Yup.date().required("Required"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        quantity: Yup.number().required("Required"),
        price: Yup.number().required("Required"),
      })
    )
    .min(1, "At least one item is required")
    .required("Required"),
  currency: Yup.object().shape({
    name: Yup.string().required("Required"),
    symbol: Yup.string().required("Required"),
  }),
  total: Yup.number().required("Required"),
  customer: Yup.object().required("Required"),
});
