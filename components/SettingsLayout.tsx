import {
  BellIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

const routes = [
  {
    label: "Dashboard",
    options: [
      {
        label: "Customers",
        icon: BuildingOfficeIcon,
        href: "/settings/customers",
      },
      {
        label: "Taxes",
        icon: BanknotesIcon,
        href: "/settings/taxes",
      },
    ],
  },
  {
    label: "Invoices",
    options: [
      {
        label: "Account",
        icon: UserIcon,
        href: "/settings/account",
      },
      {
        label: "Notifications",
        icon: BellIcon,
        href: "/settings/notifications",
      },
    ],
  },
];

export const SettingsLayout: FC<SettingsLayoutProps> = ({
  children,
  label,
  buttonText,
  onButtonClick,
}) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row">
      <div className="sticky top-0 flex h-screen w-56 flex-col border-r bg-white/[0.6] py-4">
        {routes.map((route) => (
          <div key={route.label}>
            {route.options.map((option) => {
              const isActive = pathname === option.href;
              return (
                <Link href={option.href} key={option.href}>
                  <div
                    className={classNames(
                      "group inline-flex w-full items-center px-3 py-2 text-sm font-medium ",
                      {
                        "border-indigo-600 bg-indigo-50 !text-indigo-600":
                          isActive,
                        "text-gray-600 hover:bg-gray-50 hover:text-gray-900":
                          !isActive,
                      }
                    )}
                  >
                    <option.icon
                      className={classNames("mr-3 h-6 w-6 flex-shrink-0 ", {
                        "text-indigo-500": isActive,
                        "text-gray-400 group-hover:text-gray-500": !isActive,
                      })}
                    />
                    {option.label}
                  </div>
                </Link>
              );
            })}
            <div className="my-2 mx-3 h-0.5 bg-gray-200/[0.5]"></div>
          </div>
        ))}
      </div>
      <div className="p-5 sm:max-w-3xl">
        <div className="mb-5 flex flex-row items-center justify-between">
          <span className="text-lg font-medium leading-6 text-gray-900">
            {label}
          </span>
          {buttonText && (
            <button
              onClick={onButtonClick}
              className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {buttonText}
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

interface SettingsLayoutProps {
  onButtonClick?: () => void;
  label: string;
  buttonText?: string;
  children: React.ReactNode;
}
