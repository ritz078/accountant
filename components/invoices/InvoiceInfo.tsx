import { Menu, Transition } from "@headlessui/react";
import {
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import classNames from "classnames";
import { AlertModal } from "../AlertModal";
import { IInvoice } from "../../pages/create-invoice";
import { format } from "date-fns";
import { formatNumber } from "../../utils/number";

export const InvoiceInfo = ({
  position,
  onClick,
  ...invoice
}: IInvoice & {
  position: number;
  onClick: (invoice: IInvoice) => void;
}) => {
  const { id, total, customer, currency, invoiceNumber, issueDate, status } =
    invoice;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <tr
        onClick={() => onClick(invoice)}
        key={id}
        className={classNames(
          position % 2 === 0 ? "bg-white" : "bg-gray-50",
          "cursor-pointer"
        )}
      >
        <td className="pl-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <span
            className={classNames(
              "capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800",
              {
                "bg-yellow-100 text-yellow-600": status === "sent",
                "bg-green-100 text-green-700": status === "paid",
              }
            )}
          >
            {status}
          </span>
        </td>
        <td className="pl-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {format(issueDate, "yyyy-MM-dd")}
        </td>
        <td className="pl-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {invoiceNumber}
        </td>
        <td className="pl-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {customer?.name}
        </td>
        <td className="pl-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <span className="inline-block min-w-5 mr-1 text-gray-400">
            {currency.symbol}
          </span>
          {formatNumber(total)}
        </td>
        <td className="px-6 py-2.5 whitespace-nowrap text-right text-sm font-medium">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="bg-gray-100 p-1 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                <span className="sr-only">Open options</span>
                <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right  z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "group flex items-center px-4 py-2 text-sm"
                        )}
                      >
                        <PencilAltIcon
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        Edit
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => setShowDeleteConfirmation(true)}
                        className={classNames(
                          active ? "bg-gray-100 text-red-900" : "text-red-700",
                          "group flex items-center px-4 py-2 text-sm"
                        )}
                      >
                        <TrashIcon
                          className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500"
                          aria-hidden="true"
                        />
                        Delete
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </td>
      </tr>
      <AlertModal
        onClose={() => setShowDeleteConfirmation(false)}
        show={showDeleteConfirmation}
        onConfirm={() => {
          setShowDeleteConfirmation(false);
        }}
        title="Delete Invoice"
        confirmationLabel="Delete"
        description="Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone."
      />
    </>
  );
};
