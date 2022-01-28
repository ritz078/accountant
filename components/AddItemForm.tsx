import { Input } from "./Input";
import React from "react";
import { useFormik } from "formik";
import { InvoiceItem } from "@prisma/client";

export const AddItemForm: React.FC<IInvoiceItemsProps> = ({ onClose }) => {
  const formik = useFormik<Partial<InvoiceItem>>({
    initialValues: {},
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="px-4 sm:px-6">
      <Input
        name="name"
        type="text"
        label="Item Name"
        className="mt-3"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <Input
        name="description"
        type="text"
        label="Description"
        className="mt-3"
        onChange={formik.handleChange}
        value={formik.values.description}
      />

      <div className="mt-3">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="price"
            id="price"
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="0.00"
            onChange={formik.handleChange}
            value={formik.values.unitPrice}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
            </select>
          </div>
        </div>
      </div>

      <div className="relative pt-4">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Additional Notes
        </label>
        <div className="mt-2">
          <textarea
            rows={4}
            name="notes"
            id="notes"
            className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Notes"
            onChange={formik.handleChange}
            value={formik.values.notes || undefined}
          />
        </div>
      </div>

      <div className="mt-1 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
        >
          Save and Add Item
        </button>
      </div>
    </div>
  );
};

interface IInvoiceItemsProps {
  onClose: () => void;
}
