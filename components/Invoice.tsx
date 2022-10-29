"use client";

import React, { Fragment, useContext, useState } from "react";
import { useMeta } from "@/data/useMeta";
import { useCustomers } from "@/data/customer";
import { useTaxes } from "@/data/taxes";
import { useInvoiceItems } from "@/data/invoiceItems";
import { useFormik } from "formik";
import { IInvoice } from "@/types/invoice";
import { addDays, format, parseISO } from "date-fns";
import { getAmount, getTotalInvoiceAmount, schema } from "@/utils/invoice";
import { Select } from "@/components/Select/Select";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/Input";
import { AddTaxOrDiscount } from "@/components/CreateInvoice/AddTaxOrDiscount";
import { formatNumber } from "@/utils/number";
import classNames from "classnames";
import { AddItem } from "@/components/CreateInvoice/AddItem";
import { SlideOver } from "@/components/SlideOver";
import { AddItemForm } from "@/components/AddItemForm";
import { CurrencySelect } from "@/components/Select/CurrencySelect";
import { createInvoice, updateInvoice, useInvoices } from "@/data/invoices";
import { SlideOverContext, SlideOverType } from "@/contexts/slideOver";

export const Invoice: React.FC<{
  invoice?: IInvoice;
}> = ({ invoice }) => {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const { data: metaData } = useMeta();
  const { data: customers } = useCustomers();
  const { data: taxPresets } = useTaxes();
  const { data: items } = useInvoiceItems();
  const { mutate } = useInvoices();

  const { setSlideOver } = useContext(SlideOverContext);

  const formik = useFormik<IInvoice>({
    initialValues:
      invoice ||
      ({
        id: 6,
        invoiceNumber: "INV-00006",
        issueDate: new Date(),
        dueDate: new Date(addDays(new Date(), 14)),
        notes: "",
        customer: null,
        items: [],
        taxes: [],
        currencyCode: "INR",
      } as never),
    onSubmit: async (values) => {
      await (invoice ? updateInvoice(values) : createInvoice(values));
      await mutate();
    },
    validationSchema: schema,
  });

  const { values, setFieldValue, handleChange, errors, handleSubmit, touched } =
    formik;

  if (!metaData || !customers || !taxPresets || !items) return null;

  const currency = metaData.currencies.find(
    (c) => c.code === values.currencyCode
  );

  const currencySymbol = currency?.symbol;
  const customer = customers.find((c) => c.id === values.customerId);
  const address = customer?.address;

  return (
    <div className="flex flex-1 gap-4">
      <div className="w-8/12 shrink-0 grow-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {invoice ? `Invoice #${invoice.invoiceNumber}` : "Create Invoice"}
        </h3>
        <div className="mt-5 h-fit shrink-0 flex-col overflow-hidden rounded-lg bg-white shadow">
          <div className="flex flex-1 flex-col overflow-x-hidden">
            <div className="relative my-6 px-4 sm:px-6">
              <div className="flex flex-row justify-between gap-28">
                <div className="flex h-fit w-1/2 flex-col">
                  <div className="flex w-full flex-row gap-2">
                    <div className="flex flex-1 flex-col">
                      <Select
                        error={!!(touched.customerId && errors.customerId)}
                        label="Customer"
                        required
                        onChange={(selected) =>
                          setFieldValue("customerId", selected.id)
                        }
                        value={customers.find(
                          (c) => c.id === values.customerId
                        )}
                        options={customers}
                        placeholder="Select your customer"
                        buttonClassName="shadow-none"
                      />
                    </div>

                    <button
                      onClick={() =>
                        setSlideOver({
                          type: SlideOverType.ADD_CUSTOMER,
                        })
                      }
                      type="button"
                      className="inline-flex h-fit items-center self-end rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>

                  {address && (
                    <>
                      <div className="mt-5 rounded-sm border border-gray-200 bg-gray-100 bg-opacity-50 p-4 text-sm text-gray-900">
                        <div>{address.line1}</div>
                        <div>{address.line2}</div>
                        <div>
                          {address.city}-{address.pin}
                        </div>
                        <div>
                          {address.state}, {address.country}
                        </div>
                      </div>

                      <div className="mt-2 cursor-pointer text-right text-sm text-indigo-600 hover:underline">
                        Edit Customer Details
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <Input
                    error={!!(touched.invoiceNumber && errors.invoiceNumber)}
                    required
                    label="Invoice No"
                    name="invoiceNumber"
                    type="text"
                    className="flex flex-1 flex-col"
                    onChange={handleChange}
                    value={values.invoiceNumber}
                  />

                  <Input
                    required
                    label="Issued on"
                    name="issueDate"
                    type="date"
                    className="flex flex-1 flex-col"
                    onChange={(e) =>
                      setFieldValue("issueDate", new Date(e.target.value))
                    }
                    value={format(
                      typeof values.issueDate === "string"
                        ? parseISO(values.issueDate)
                        : values.issueDate,
                      "yyyy-MM-dd"
                    )}
                  />

                  <Input
                    required
                    label="Due on"
                    name="dueDate"
                    type="date"
                    className="flex flex-1 flex-col"
                    onChange={(e) =>
                      setFieldValue("dueDate", new Date(e.target.value))
                    }
                    value={format(
                      typeof values.dueDate === "string"
                        ? parseISO(values.dueDate)
                        : values.dueDate,
                      "yyyy-MM-dd"
                    )}
                  />
                </div>
              </div>

              <div className="mt-4 flex w-full flex-col pt-6">
                <div className="-my-2 sm:-mx-6 lg:-mx-8 ">
                  <div className="inline-block min-w-full pt-2 align-middle sm:px-6 lg:px-8">
                    <div className="rounded-sm border-b border-gray-100">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr className="border border-gray-100 bg-[#f9f9f9]">
                            <th
                              scope="col"
                              className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                              Items
                            </th>
                            <th
                              scope="col"
                              className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                              Qty
                            </th>
                            <th
                              scope="col"
                              className="p-2 pr-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="p-2 pr-3 text-left text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody className="!border-gray-100 align-top">
                          {values.items.map((item, itemIndex) => {
                            const {
                              unitPrice,
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
                                  <td className="whitespace-nowrap py-3 pl-0 text-sm">
                                    <div className="isolate -space-y-px rounded-md shadow-sm">
                                      <div className="relative rounded-md rounded-b-none border border-gray-200 focus-within:z-10 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                                        <input
                                          name={`items[${itemIndex}].name`}
                                          onChange={handleChange}
                                          value={name}
                                          className="relative block w-full rounded-none rounded-t-md border-gray-300 bg-transparent px-3 py-2 outline-none focus:z-10 sm:text-sm"
                                          placeholder="Name"
                                        />
                                      </div>
                                      <div className="relative rounded-md rounded-t-none border border-gray-200 focus-within:z-10 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                                        <input
                                          value={description || undefined}
                                          onChange={handleChange}
                                          name={`items[${itemIndex}].description`}
                                          className="relative block w-full rounded-none rounded-b-md border-gray-300 bg-transparent px-3 py-2 outline-none focus:z-10 sm:text-sm"
                                          placeholder="Description"
                                        />
                                      </div>
                                    </div>

                                    <AddTaxOrDiscount
                                      currencySymbol={currencySymbol}
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
                                  <td className="w-24 whitespace-nowrap p-2 py-3 text-sm text-gray-500">
                                    <Input
                                      min={0}
                                      type="number"
                                      name={`items[${itemIndex}].quantity`}
                                      onChange={handleChange}
                                      value={quantity}
                                    />
                                  </td>
                                  <td className="w-36 whitespace-nowrap p-2 py-3 text-sm text-gray-500">
                                    <Input
                                      min={0}
                                      type="number"
                                      name={`items[${itemIndex}].price`}
                                      prefix={currencySymbol}
                                      onChange={handleChange}
                                      value={unitPrice}
                                    />
                                  </td>
                                  <td className="p-2 py-3 text-right text-sm text-gray-500">
                                    <div className="pt-2">
                                      {currencySymbol}{" "}
                                      {formatNumber(
                                        getAmount(unitPrice * quantity, taxes)
                                      )}
                                    </div>

                                    <TrashIcon
                                      className="absolute right-0 bottom-5 h-5 w-5 cursor-pointer text-red-500 hover:text-red-600"
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
                    "relative mt-8 block flex w-full flex-col items-center rounded-lg border-2 border-dashed border-gray-200 p-10 text-center focus:outline-none",
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

              <div className="mt-4 flex h-fit flex-row justify-between">
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

                <div className="flex w-1/3 flex-col">
                  <div className="flex items-center justify-between py-1 text-sm">
                    <span className="font-medium">Subtotal</span>
                    <span className="text-base font-medium text-gray-700">
                      {currencySymbol}{" "}
                      {formatNumber(getTotalInvoiceAmount(values, false))}
                    </span>
                  </div>

                  {values.taxes?.map((tax) => (
                    <div
                      key={tax.id}
                      className="flex items-center justify-between py-1 text-sm text-gray-600"
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
                      <div className="block py-1 pb-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
                        Add Tax
                      </div>
                    }
                    dropdownClassName="!right-0 !left-auto"
                    currencySymbol={currencySymbol}
                    items={taxPresets}
                    applied={values.taxes}
                    onCreate={() =>
                      setSlideOver({
                        type: SlideOverType.ADD_TAX_PRESET,
                      })
                    }
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

                  <div className="flex justify-between border-t border-gray-200 py-1 text-sm">
                    <span className="font-medium">Total Payable</span>
                    <span className="text-base font-medium text-gray-700">
                      {currencySymbol}{" "}
                      {formatNumber(getTotalInvoiceAmount(values))}
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
                    className="block w-full resize-none rounded-md border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={handleChange}
                    value={values.notes || undefined}
                  />
                </div>
              </div>
            </div>
          </div>

          <SlideOver
            open={showAddItemModal}
            onClose={() => setShowAddItemModal(false)}
            title="Add Item"
          >
            <AddItemForm onClose={() => setShowAddItemModal(false)} />
          </SlideOver>
        </div>
      </div>

      <div className="sticky top-4 mt-11 flex h-fit w-3/12 flex-col">
        <div className="flex w-full flex-row gap-4">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-gray-900 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Preview
          </button>
          <button
            type="submit"
            onClick={() => handleSubmit()}
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>

        <div className="bg-gradient-tr my-4 rounded-md bg-white bg-opacity-80 p-4 shadow">
          <CurrencySelect
            value={values.currencyCode}
            onChange={(currency) =>
              setFieldValue("currencyCode", currency.code)
            }
          />
        </div>
      </div>
    </div>
  );
};
