import { FC } from "react";
import { format } from "date-fns";
import classNames from "classnames";
import { formatNumber } from "@/utils/number";
import {
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { IInvoice } from "@/types/invoice";
import { useMeta } from "@/data/useMeta";
import { useCustomers } from "@/data/customer";

const timeline = [
  {
    id: 1,
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 2,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 22",
    datetime: "2020-09-22",
    icon: HandThumbUpIcon,
    iconBackground: "bg-blue-500",
  },
  {
    id: 3,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    href: "#",
    date: "Sep 28",
    datetime: "2020-09-28",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: 4,
    content: "Advanced to interview by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 30",
    datetime: "2020-09-30",
    icon: HandThumbUpIcon,
    iconBackground: "bg-blue-500",
  },
];

export const InvoiceDetails: FC<IInvoice> = ({
  customerId,
  currencyCode,
  issueDate,
  total,
  notes,
  invoiceNumber,
  status,
}) => {
  const { data: metaData } = useMeta();
  const { data: customers } = useCustomers();

  if (!metaData || !customers) return null;

  const currency = metaData?.currencies.find(
    (currency) => currency.code === currencyCode
  );

  console.log(issueDate);

  const customer = customers?.find((customer) => customer.id === customerId);

  return (
    <div className="ml-5 flex h-fit flex-1 flex-col overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="flex items-center text-lg font-medium leading-6 text-gray-900">
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
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {customer?.name}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-3 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {format(new Date(issueDate), "MMMM dd, yyyy")}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-3 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <a
                href={`mailto:${customer?.email}`}
                className="overflow-hidden text-ellipsis text-blue-800 hover:underline"
              >
                {customer?.email}
              </a>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-3 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Amount</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {currency?.symbol} {formatNumber(total)}
              <span
                className={classNames(
                  "ml-2 inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium capitalize text-indigo-800",
                  {
                    "bg-yellow-100 text-yellow-700": status === "issued",
                    "bg-green-100 text-green-700": status === "paid",
                  }
                )}
              >
                {status}
              </span>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:px-6">
            <dt className="mb-2 text-sm font-medium text-gray-500">Note</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {notes}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flow-root p-5">
        <ul role="list" className="-mb-8">
          {timeline.map((event, eventIdx) => (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== timeline.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={classNames(
                        event.iconBackground,
                        "flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
                      )}
                    >
                      <event.icon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">
                        {event.content}{" "}
                        <a
                          href={event.href}
                          className="font-medium text-gray-900"
                        >
                          {event.target}
                        </a>
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <time dateTime={event.datetime}>{event.date}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
