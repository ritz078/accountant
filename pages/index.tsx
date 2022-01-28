import type { NextPage } from "next";
import {
  ChevronDownIcon,
  DocumentIcon,
  MinusCircleIcon,
  OfficeBuildingIcon,
  PlusCircleIcon,
  ReceiptTaxIcon,
  TrendingUpIcon,
  ViewListIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useMemo } from "react";
import classNames from "classnames";
import Link from "next/link";
import { ComponentProps } from "./_app";

const stats = [
  {
    name: "Revenue",
    stat: "71,897",
    icon: PlusCircleIcon,
    color: "green",
  },
  {
    name: "Expenses",
    stat: "58.16",
    icon: MinusCircleIcon,
    color: "red",
  },
  {
    name: "Profit",
    stat: "58.16",
    icon: TrendingUpIcon,
    color: "green",
  },
];

const Home: NextPage<ComponentProps> = ({
  setShowAddTaxForm,
  setShowAddCustomerForm,
}) => {
  const createMenuList = useMemo(
    () => [
      {
        Icon: DocumentIcon,
        label: "Invoice",
        href: "/invoice",
      },
      {
        Icon: ViewListIcon,
        label: "Expense",
        onClick: () => setShowAddTaxForm(true),
      },
      {
        Icon: OfficeBuildingIcon,
        label: "Customer",
        onClick: () => setShowAddCustomerForm(true),
      },
      {
        Icon: ReceiptTaxIcon,
        label: "Tax",
        onClick: () => setShowAddTaxForm(true),
      },
    ],
    [setShowAddCustomerForm, setShowAddTaxForm]
  );

  return (
    <div className="flex flex-row flex-1">
      <div className="w-8/12">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            FY 2021-22
          </h3>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-100 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                Create
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
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
              <Menu.Items className="z-10 py-1 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                {createMenuList.map(({ label, Icon, href, onClick }) => (
                  <div className="border-none" key={label}>
                    <Menu.Item>
                      {({ active }) =>
                        href ? (
                          <Link href="/create-invoice">
                            <a
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "group flex items-center px-4 py-2 text-sm"
                              )}
                            >
                              <Icon
                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              {label}
                            </a>
                          </Link>
                        ) : (
                          <span
                            onClick={onClick}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "group cursor-pointer flex items-center px-4 py-2 text-sm"
                            )}
                          >
                            <Icon
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            {label}
                          </span>
                        )
                      }
                    </Menu.Item>
                  </div>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <dl className="mt-5 grid grid-cols-1 shadow rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 overflow-hidden divide-y md:grid-cols-3 md:divide-y-0">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative pt-5 px-4 pb-6 sm:pt-6 sm:px-6 overflow-hidden"
            >
              <dt>
                <div className="absolute bg-white/[0.2] rounded-md p-3">
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-200 truncate">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <span className="mr-1 text-white">₹</span>
                <p className="text-2xl font-semibold text-white">{item.stat}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="w-4/12" />
    </div>
  );
};

export default Home;
