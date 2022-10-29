"use client";

import type { NextPage } from "next";
import {
  ChevronDownIcon,
  DocumentIcon,
  MinusCircleIcon,
  BuildingOfficeIcon,
  PlusCircleIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useMemo } from "react";
import classNames from "classnames";
import Link from "next/link";
import { SlideOverContext, SlideOverType } from "@/contexts/slideOver";

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
    icon: ArrowTrendingUpIcon,
    color: "green",
  },
];

const Home: NextPage<{}> = () => {
  const { setSlideOver } = useContext(SlideOverContext);

  const createMenuList = useMemo(
    () => [
      {
        Icon: DocumentIcon,
        label: "Invoice",
        href: "/invoice",
      },
      {
        Icon: ListBulletIcon,
        label: "Expense",
        onClick: () =>
          setSlideOver({
            type: SlideOverType.ADD_TAX_PRESET,
          }),
      },
      {
        Icon: BuildingOfficeIcon,
        label: "Customer",
        onClick: () =>
          setSlideOver({
            type: SlideOverType.ADD_CUSTOMER,
          }),
      },
      {
        Icon: BanknotesIcon,
        label: "Tax",
        onClick: () =>
          setSlideOver({
            type: SlideOverType.ADD_TAX_PRESET,
          }),
      },
    ],
    [setSlideOver]
  );

  return (
    <div className="flex flex-1 flex-row">
      <div className="w-8/12">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            FY 2021-22
          </h3>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-100 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {createMenuList.map(({ label, Icon, href, onClick }) => (
                  <div className="border-none" key={label}>
                    <Menu.Item>
                      {({ active }) =>
                        href ? (
                          <Link href="/invoice">
                            <div
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
                            </div>
                          </Link>
                        ) : (
                          <span
                            onClick={onClick}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "group flex cursor-pointer items-center px-4 py-2 text-sm"
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
        <dl className="mt-5 grid grid-cols-1 divide-y overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 shadow md:grid-cols-3 md:divide-y-0">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative overflow-hidden px-4 pt-5 pb-6 sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-white/[0.2] p-3">
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-200">
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
