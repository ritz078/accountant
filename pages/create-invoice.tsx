import { NextPage } from "next";
import { Select } from "../components/Select/Select";
import { Input } from "../components/Input";
import React, { Fragment, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import { AddItem } from "../components/CreateInvoice/AddItem";
import { Modal } from "../components/Modal";
import { InvoiceItems } from "../components/InvoiceItems";
import { useFormik } from "formik";
import { addDays, format } from "date-fns";
import { CurrencySelect, ICurrency } from "../components/Select/CurrencySelect";
import { currencies } from "../utils/currency";
import { AddTaxOrDiscount } from "../components/CreateInvoice/AddTaxOrDiscount";
import { getAmount, getTotalInvoiceAmount, schema } from "../utils/invoice";
import classNames from "classnames";

const customers = [{ id: 1, name: "Wade Cooper" }];

const items: IItem[] = [
  {
    id: 1,
    name: "This is an item",
    description: "lorem ipsum dolor sit amet consectetur adipisicing",
    price: 1000,
    quantity: 0,
    discounts: [],
    taxes: [],
  },
];

const taxPresets: ITaxOrDiscount[] = [
  {
    id: 1,
    name: "GST",
    value: 10,
    type: "percentage",
  },
];

const CreateInvoice: NextPage = () => {
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const formik = useFormik<IInvoice>({
    initialValues: {
      id: 6,
      invoiceNumber: "INV-00006",
      issueDate: format(new Date(), "yyyy-MM-dd"),
      dueDate: format(new Date(addDays(new Date(), 14)), "yyyy-MM-dd"),
      notes: "",
      customer: null,
      items: [],
      taxes: [],
      currency: currencies.find((c) => c.id === "INR")!,
    } as never,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: schema,
  });

  const { values, setFieldValue, handleChange, errors, handleSubmit, touched } =
    formik;

  const currencySymbol = formik.values.currency.symbol;

  return (
    <div className="flex flex-1 gap-4">
      <div className="w-8/12 shrink-0 grow-0 overflow-hidden">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Create Invoice
        </h3>
        <div className="mt-5 bg-white overflow-hidden shadow rounded-lg h-fit flex-col shrink-0">
          <div className="flex flex-1 flex-col overflow-x-hidden">
            <div className="my-6 relative px-4 sm:px-6">
              <div className="flex flex-row justify-between gap-28">
                <div className="w-1/2 h-fit">
                  <Select
                    error={!!(touched.customer && errors.customer)}
                    label="Customer"
                    required
                    onChange={(selected) => setFieldValue("customer", selected)}
                    value={values.customer}
                    options={customers}
                    placeholder="Select your customer"
                    buttonClassName="shadow-none"
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <Input
                    error={!!(touched.invoiceNumber && errors.invoiceNumber)}
                    required
                    label="Invoice No"
                    name="invoiceNumber"
                    type="text"
                    className="flex flex-col flex-1"
                    onChange={handleChange}
                    value={values.invoiceNumber}
                  />

                  <Input
                    required
                    label="Issued on"
                    name="issueDate"
                    type="date"
                    className="flex flex-col flex-1"
                    onChange={handleChange}
                    value={values.issueDate}
                  />

                  <Input
                    required
                    label="Due on"
                    name="dueDate"
                    type="date"
                    className="flex flex-col flex-1"
                    onChange={handleChange}
                    value={values.dueDate}
                  />
                </div>
              </div>

              <div className="flex flex-col pt-6 w-full mt-4">
                <div className="-my-2 sm:-mx-6 lg:-mx-8 ">
                  <div className="pt-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="rounded-sm border-b border-gray-100">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr className="bg-[#f9f9f9] border border-gray-100">
                            <th
                              scope="col"
                              className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Items
                            </th>
                            <th
                              scope="col"
                              className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Qty
                            </th>
                            <th
                              scope="col"
                              className="p-2 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="p-2 text-right pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody className="align-top !border-gray-100">
                          {values.items.map((item, itemIndex) => {
                            const {
                              price,
                              quantity,
                              taxes,
                              name,
                              description,
                            } = values.items[itemIndex];

                            return (
                              <Fragment key={item.name}>
                                <tr
                                  className={
                                    "relative border-t border-gray-100 bg-white"
                                  }
                                >
                                  <td className="pl-0 py-3 whitespace-nowrap text-sm">
                                    <div className="isolate -space-y-px rounded-md shadow-sm">
                                      <div className="relative border border-gray-200 rounded-md rounded-b-none focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                        <input
                                          name={`items[${itemIndex}].name`}
                                          onChange={handleChange}
                                          value={name}
                                          className="outline-none relative block w-full px-3 py-2 rounded-none rounded-t-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                                          placeholder="Name"
                                        />
                                      </div>
                                      <div className="relative border border-gray-200 rounded-md rounded-t-none focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                        <input
                                          value={description}
                                          onChange={handleChange}
                                          name={`items[${itemIndex}].description`}
                                          className="outline-none relative block w-full rounded-none rounded-b-md px-3 py-2 bg-transparent focus:z-10 sm:text-sm border-gray-300"
                                          placeholder="Description"
                                        />
                                      </div>
                                    </div>

                                    <AddTaxOrDiscount
                                      currencySymbol={values.currency.symbol}
                                      items={taxPresets}
                                      applied={taxes}
                                      onCreate={() => {}}
                                      onToggle={(tax) => {
                                        if (
                                          values.items[
                                            itemIndex
                                          ].taxes.includes(tax)
                                        ) {
                                          setFieldValue(
                                            `items[${itemIndex}].taxes`,
                                            values.items[
                                              itemIndex
                                            ].taxes.filter((t) => t !== tax)
                                          );
                                        } else {
                                          setFieldValue(
                                            `items[${itemIndex}].taxes`,
                                            [
                                              ...values.items[itemIndex].taxes,
                                              tax,
                                            ]
                                          );
                                        }
                                      }}
                                    />
                                  </td>
                                  <td className="w-24 p-2 py-3 whitespace-nowrap text-sm text-gray-500">
                                    <Input
                                      min={0}
                                      type="number"
                                      name={`items[${itemIndex}].quantity`}
                                      onChange={handleChange}
                                      value={quantity}
                                    />
                                  </td>
                                  <td className="p-2 w-36 py-3 whitespace-nowrap text-sm text-gray-500">
                                    <Input
                                      min={0}
                                      type="number"
                                      name={`items[${itemIndex}].price`}
                                      prefix={values.currency.symbol}
                                      onChange={handleChange}
                                      value={price}
                                    />
                                  </td>
                                  <td className="p-2 text-sm py-3 text-gray-500 text-right">
                                    <div className="pt-2">
                                      {currencySymbol}{" "}
                                      {getAmount(price * quantity, taxes)}
                                    </div>

                                    <TrashIcon
                                      className="w-5 h-5 absolute right-0 bottom-5 text-red-500 hover:text-red-600 cursor-pointer"
                                      onClick={() => {
                                        setFieldValue(
                                          "items",
                                          values.items.filter(
                                            (_item) => _item.id !== item.id
                                          )
                                        );
                                      }}
                                    />
                                  </td>
                                </tr>
                              </Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {!values.items.length && (
                <div
                  className={classNames(
                    "relative flex flex-col items-center block w-full border-2 border-gray-200 border-dashed rounded-lg p-10 text-center focus:outline-none mt-8",
                    {
                      "border-red-500": !!(
                        touched.items && errors.items?.length
                      ),
                    }
                  )}
                >
                  <AddItem
                    items={items}
                    onCreate={() => setShowAddItemModal(true)}
                    onSelect={(item) =>
                      setFieldValue("items", [...values.items, item])
                    }
                  />
                </div>
              )}

              <div className="flex flex-row h-fit justify-between mt-4">
                {!!values.items.length ? (
                  <AddItem
                    items={items}
                    onCreate={() => setShowAddItemModal(true)}
                    onSelect={(item) =>
                      setFieldValue("items", [...values.items, item])
                    }
                    button={
                      <div className="block text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
                        Add Item
                      </div>
                    }
                  />
                ) : (
                  <div />
                )}

                <div className="flex flex-col w-1/3">
                  <div className="py-1 text-sm flex items-center justify-between">
                    <span className="font-medium">Subtotal</span>
                    <span className="text-base font-medium text-gray-700">
                      {currencySymbol} {getTotalInvoiceAmount(values, false)}
                    </span>
                  </div>

                  {values.taxes.map((tax) => (
                    <div
                      key={tax.id}
                      className="py-1 text-sm flex items-center text-gray-600 justify-between"
                    >
                      <span>{tax.name}</span>
                      <span>
                        {tax.type === "percentage"
                          ? `${tax.value}%`
                          : `${currencySymbol} ${tax.value}`}
                      </span>
                    </div>
                  ))}

                  <AddTaxOrDiscount
                    button={
                      <div className="py-1 pb-2 block text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
                        Add Tax
                      </div>
                    }
                    dropdownClassName="!right-0 !left-auto"
                    currencySymbol={values.currency.symbol}
                    items={taxPresets}
                    applied={values.taxes}
                    onCreate={() => {}}
                    onToggle={(tax) => {
                      if (values.taxes.includes(tax)) {
                        setFieldValue(
                          `taxes`,
                          values.taxes.filter((t) => t !== tax)
                        );
                      } else {
                        setFieldValue(`taxes`, [...values.taxes, tax]);
                      }
                    }}
                  />

                  <div className="py-1 text-sm flex justify-between border-t border-gray-200">
                    <span className="font-medium">Total</span>
                    <span className="text-base font-medium text-gray-700">
                      {currencySymbol} {getTotalInvoiceAmount(values)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Notes
                </label>
                <div className="mt-2">
                  <textarea
                    rows={6}
                    name="notes"
                    id="notes"
                    className="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-200 rounded-md"
                    onChange={handleChange}
                    value={values.notes}
                  />
                </div>
              </div>
            </div>
          </div>

          <Modal
            open={showAddItemModal}
            onClose={() => setShowAddItemModal(false)}
            className="-mt-10"
          >
            <InvoiceItems onClose={() => setShowAddItemModal(false)} />
          </Modal>
        </div>
      </div>

      <div className="flex flex-col h-fit w-3/12 mt-11 sticky top-4">
        <div className="flex flex-row gap-4 w-full">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow text-sm font-medium rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Preview
          </button>
          <button
            type="submit"
            onClick={() => handleSubmit()}
            className="w-full bg-indigo-500 inline-flex justify-center py-2 px-4 border border-transparent shadow text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>

        <div className="bg-gradient-tr bg-white bg-opacity-80 my-4 shadow p-4 rounded-md">
          <CurrencySelect
            value={values.currency}
            onChange={(currency) => setFieldValue("currency", currency)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;

interface ICustomer {
  id: number;
  name: string;
}

export interface IItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  quantity: number;
  taxes: ITaxOrDiscount[];
  discounts: ITaxOrDiscount[];
}

export interface ITaxOrDiscount {
  id: number;
  type: "percentage" | "fixed";
  name: string;
  value: number;
}

export interface IInvoice {
  id: number;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  customer: ICustomer | null;
  notes: string;
  items: IItem[];
  taxes: ITaxOrDiscount[];
  discounts: ITaxOrDiscount[];
  currency: ICurrency;
  total: number;
}
