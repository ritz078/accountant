import { Input } from "./Input";
import React from "react";
import { XIcon } from "@heroicons/react/outline";

export const AddItemForm: React.FC<IInvoiceItemsProps> = ({ onClose }) => {
  return (
    <>
      <div className="flex justify-between flex-row mb-3 pb-3 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Add a New Item
        </h3>
        <button
          type="button"
          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => onClose()}
        >
          <span className="sr-only">Close</span>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <Input
        name="name"
        type="text"
        label="Item Name"
        className="mt-3"
        onChange={() => {}}
      />
      <Input
        name="description"
        type="text"
        label="Description"
        className="mt-3"
        onChange={() => {}}
      />

      <div className="mt-3">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="amount"
            id="price"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
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
            className="shadow-sm resize-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mt-1 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
        >
          Save and Add Item
        </button>
      </div>
    </>
  );
};

interface IInvoiceItemsProps {
  onClose: () => void;
}
