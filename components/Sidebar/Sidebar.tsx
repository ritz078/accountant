import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  Bars3Icon,
  UsersIcon,
  XMarkIcon,
  BanknotesIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Invoices", href: "/invoices", icon: UsersIcon },
  { name: "Expenses", href: "/expenses", icon: FolderIcon },
  { name: "Taxes", href: "/taxes", icon: BanknotesIcon },
  { name: "Reports", href: "/reports", icon: ChartBarIcon },
  {
    name: "Settings",
    href: "/settings/customers",
    group: "/settings",
    icon: CogIcon,
  },
];

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  console.log(pathname);

  return (
    <aside>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  Add Logo Here
                </div>
                <nav className="mt-5 space-y-1 px-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          isActive
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            isActive
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-4 h-6 w-6 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    );
                  })}
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                <a href="#" className="group block flex-shrink-0">
                  <div className="flex items-center">
                    <div>Add Logo here</div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                        Ritesh Kumar
                      </p>
                      <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className="w-14 flex-shrink-0">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">LOGO</div>
            <nav className="mt-5 flex-1 space-y-1">
              {navigation.map((item) => {
                const isActive = item.group
                  ? pathname.startsWith(item.group)
                  : item.href === pathname;
                return (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={classNames(
                        isActive
                          ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          isActive
                            ? "text-indigo-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-3 h-6 w-6 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <a href="#" className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={""}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    Ritesh Kumar
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    View profile
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
};
