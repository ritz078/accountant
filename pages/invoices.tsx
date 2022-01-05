import { NextPage } from "next";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { InvoiceDetails } from "../components/invoices/InvoiceDetails";
import { InvoiceInfo } from "../components/invoices/InvoiceInfo";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
    id: 1,
  },
  {
    name: "Cody Fisher",
    title: "Product Directives Officer",
    role: "Owner",
    email: "cody.fisher@example.com",
    id: 1,
  },
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
    id: 1,
  },
  {
    name: "Cody Fisher",
    title: "Product Directives Officer",
    role: "Owner",
    email: "cody.fisher@example.com",
    id: 1,
  },
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
    id: 1,
  },
  {
    name: "Cody Fisher",
    title: "Product Directives Officer",
    role: "Owner",
    email: "cody.fisher@example.com",
    id: 1,
  },
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
    id: 1,
  },
  {
    name: "Cody Fisher",
    title: "Product Directives Officer",
    role: "Owner",
    email: "cody.fisher@example.com",
    id: 1,
  },
  // More people...
];

const Invoices: NextPage = () => {
  return (
    <div className="flex flex-row">
      <div className="bg-white overflow-hidden shadow rounded-lg h-fit w-8/12 flex-col shrink-0">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Invoices
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <Link href="/create-invoice">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create new invoice
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {people.map((person, personIdx) => (
                      <InvoiceInfo
                        key={personIdx}
                        position={personIdx}
                        {...person}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <nav
          className="bg-white px-4 py-2 flex items-center justify-between sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">20</span> results
            </p>
          </div>
          <div className="flex-1 flex justify-between sm:justify-end">
            <a
              href="#"
              className="relative inline-flex p-1 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
            >
              <ChevronLeftIcon className="text-gray-500 h-6 w-6" />
            </a>
            <a
              href="#"
              className="ml-3 relative inline-flex p-1 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
            >
              <ChevronRightIcon className="text-gray-500 h-6 w-6" />
            </a>
          </div>
        </nav>
      </div>

      <div className="w-4/12">
        <InvoiceDetails />
      </div>
    </div>
  );
};

export default Invoices;
