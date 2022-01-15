import { FC } from "react";
import { IInvoice } from "../../../pages/create-invoice";
import { format } from "date-fns";
import classNames from "classnames";
import { formatNumber } from "../../../utils/number";

export const InvoiceDetails: FC<IInvoice> = ({
  customer,
  currency,
  issueDate,
  total,
  notes,
  invoiceNumber,
  status,
}) => {
  return (
    <div className="bg-white ml-5 shadow overflow-hidden sm:rounded-lg flex flex-1 flex-col h-fit">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          Invoice #{invoiceNumber}
        </h3>
        <p className="mr-1 max-w-2xl text-sm text-gray-500">
          Invoice details and application.{" "}
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-3 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Customer</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {customer?.name}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-3 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {format(issueDate, "MMMM dd, yyyy")}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-3 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <a
                href={`mailto:${customer?.email}`}
                className="text-blue-800 hover:underline text-ellipsis overflow-hidden"
              >
                {customer?.email}
              </a>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-3 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Amount</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {currency.symbol} {formatNumber(total)}
              <span
                className={classNames(
                  "ml-2 capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800",
                  {
                    "bg-yellow-100 text-yellow-700": status === "sent",
                    "bg-green-100 text-green-700": status === "paid",
                  }
                )}
              >
                {status}
              </span>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 mb-2">Note</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {notes}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
