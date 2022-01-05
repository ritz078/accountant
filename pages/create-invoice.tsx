import { NextPage } from "next";
import { Select } from "../components/Select";
import { Input } from "../components/Input";
import React, { Fragment, useState } from "react";
import classNames from "classnames";
import { TrashIcon } from "@heroicons/react/outline";
import { AddItem } from "../components/CreateInvoice/AddItem";
import { Modal } from "../components/Modal";
import { InvoiceItems } from "../components/InvoiceItems";
import { useFormik } from "formik";
import { addDays, format } from "date-fns";

const customers = [{ id: 1, name: "Wade Cooper" }];

const items: IItem[] = [
  {
    id: 1,
    name: "This is an item",
    description: "lorem ipsum dolor sit amet consectetur adipisicing",
    price: 1000,
    quantity: 0,
  },
];

const CreateInvoice: NextPage = () => {
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const formik = useFormik<IInvoice>({
    initialValues: {
      id: 6,
      issueDate: format(new Date(), "yyyy-MM-dd"),
      dueDate: format(new Date(addDays(new Date(), 14)), "yyyy-MM-dd"),
      notes: "",
      customer: null,
      items: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg h-fit w-8/12 flex-col shrink-0">
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <div className="my-6 relative px-4 sm:px-6">
          <div className="flex flex-row justify-between gap-28">
            <div className="p-3 bg-indigo-500 bg-opacity-10 border border-indigo-200 rounded-md w-1/2 h-fit">
              <Select
                label="Customer"
                required
                onChange={(selected) =>
                  formik.setFieldValue("customer", selected)
                }
                value={formik.values.customer}
                options={customers}
                placeholder="Select your customer"
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <Input
                required
                label="Invoice No"
                name="id"
                type="text"
                className="flex flex-col flex-1"
                onChange={formik.handleChange}
                value={formik.values.id}
              />

              <Input
                required
                label="Issued on"
                name="issueDate"
                type="date"
                className="flex flex-col flex-1"
                onChange={formik.handleChange}
                value={formik.values.issueDate}
              />

              <Input
                required
                label="Due on"
                name="dueDate"
                type="date"
                className="flex flex-col flex-1"
                onChange={formik.handleChange}
                value={formik.values.dueDate}
              />
            </div>
          </div>

          <div className="flex flex-col pt-6 w-full mt-4">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="pt-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="p-2 pl-0 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                          className="p-2 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>

                        <th />
                      </tr>
                    </thead>
                    <tbody className="align-top !border-gray-100">
                      {formik.values.items.map((item, itemIndex) => (
                        <Fragment key={item.name}>
                          <tr
                            className={classNames(
                              "relative border-t border-gray-100"
                            )}
                          >
                            <td className="p-2 pl-0 pt-3 whitespace-nowrap text-sm text-gray-900">
                              <Input
                                name={`items[${itemIndex}].name`}
                                onChange={formik.handleChange}
                                placeholder="Item Name"
                                value={formik.values.items[itemIndex].name}
                              />
                            </td>
                            <td className="w-14 p-2 pt-3 whitespace-nowrap text-sm text-gray-500">
                              <Input
                                type="number"
                                name={`items[${itemIndex}].quantity`}
                                onChange={formik.handleChange}
                                value={formik.values.items[itemIndex].quantity}
                              />
                            </td>
                            <td className="p-2 w-24 pt-3 whitespace-nowrap text-sm text-gray-500">
                              <Input
                                type="number"
                                name={`items[${itemIndex}].price`}
                                onChange={formik.handleChange}
                                value={formik.values.items[itemIndex].price}
                              />
                            </td>
                            <td className="p-2 text-sm pt-3 text-gray-500">
                              <div className="pt-2">
                                {formik.values.items[itemIndex].price *
                                  (formik.values.items[itemIndex].quantity ||
                                    0)}
                              </div>
                            </td>

                            <td className="py-3 pt-3">
                              <TrashIcon
                                className="w-5 h-5 text-red-500 cursor-pointer"
                                onClick={() => {
                                  formik.setFieldValue(
                                    "items",
                                    formik.values.items.filter(
                                      (_item) => _item.id !== item.id
                                    )
                                  );
                                }}
                              />
                            </td>
                          </tr>
                          <tr className={classNames("relative")}>
                            <td className="pt-0 pl-0 pr-2 pb-3 whitespace-nowrap text-sm text-gray-500">
                              <textarea
                                name={`items[${itemIndex}].description`}
                                className={
                                  "rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 resize-none"
                                }
                                placeholder="Description"
                                onChange={formik.handleChange}
                                rows={1}
                                value={
                                  formik.values.items[itemIndex].description
                                }
                              />
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mb-6 z-10">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div
                className={classNames("w-full border-t border-indigo-300", {
                  "!border-gray-100": formik.values.items.length,
                })}
              />
            </div>
            <div
              className={classNames("relative flex justify-center mt-3", {
                "mt-6": !formik.values.items.length,
              })}
            >
              <AddItem
                items={items}
                onCreate={() => setShowAddItemModal(true)}
                onSelect={(item) =>
                  formik.setFieldValue("items", [...formik.values.items, item])
                }
              />
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <div />
            <div className="w-1/3 text-sm flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span className="text-base font-medium text-gray-700">
                {formik.values.items.reduce(
                  (a, b) => a + b.price * b.quantity,
                  0
                )}
              </span>
            </div>
          </div>

          <div className="relative py-6">
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
                onChange={formik.handleChange}
                className="shadow-sm resize-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={formik.values.notes}
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="flex-shrink-0 px-4 py-4 flex justify-end border-t">
        <button
          type="submit"
          className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </footer>

      <Modal
        open={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        className="-mt-10"
      >
        <InvoiceItems onClose={() => setShowAddItemModal(false)} />
      </Modal>
    </div>
  );
};

export default CreateInvoice;

interface ICreateInvoiceProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

interface ICustomer {
  id: number;
  name: string;
}

export interface IItem {
  id?: number;
  name?: string;
  description?: string;
  price: number;
  currency?: string;
  quantity: number;
}

interface IInvoice {
  id: number;
  issueDate: string;
  dueDate: string;
  customer: ICustomer | null;
  notes: string;
  items: IItem[];
}
