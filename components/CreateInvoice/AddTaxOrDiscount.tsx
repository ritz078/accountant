import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";
import classNames from "classnames";
import { Tax } from "@prisma/client";

function getTaxLabel(tax: Tax, currencySymbol?: string, formatValue = true) {
  return (
    <>
      {tax.name}{" "}
      <span className={formatValue ? `text-xs text-gray-500` : undefined}>
        (
        {tax.type === "percentage"
          ? `${tax.value}%`
          : `${currencySymbol}${tax.value}`}
        )
      </span>
    </>
  );
}

export function AddTaxOrDiscount({
  items,
  onCreate,
  onToggle,
  currencySymbol,
  applied,
  button,
  dropdownClassName,
}: IAddTaxOrDiscountProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <div className="mt-2 mr-2 flex flex-row">
            {button || (
              <div className="flex cursor-pointer flex-row items-center rounded-md bg-teal-100 py-1 px-2 text-xs text-gray-500 text-teal-600 hover:bg-teal-200 hover:text-teal-700">
                {applied.length
                  ? applied.map((tax, i) => (
                      <Fragment key={tax.id}>
                        {getTaxLabel(tax, currencySymbol, false)}{" "}
                        {i === applied.length - 2 && ","}
                      </Fragment>
                    ))
                  : "Add Tax"}{" "}
                <PlusIcon className="ml-1 h-3 w-3" />
              </div>
            )}
          </div>
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
        <Menu.Items
          className={classNames(
            "absolute left-0 bottom-10 z-10 mt-2 max-h-64 w-72 origin-top-left overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            dropdownClassName
          )}
        >
          <div className="py-1">
            {items.map((tax, index) => (
              <Menu.Item as={"div"} key={tax.id} onClick={() => onToggle(tax)}>
                <div className="flex cursor-pointer flex-row items-center justify-between px-4 py-2 hover:bg-gray-50">
                  <span className="text-sm">
                    {getTaxLabel(tax, currencySymbol)}
                  </span>

                  {applied?.some((aTax) => aTax.id === tax.id) && (
                    <CheckIcon className="h-5 w-5" />
                  )}
                </div>
              </Menu.Item>
            ))}

            <div className="mt-1 border-t border-gray-100 pt-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={onCreate}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block flex cursor-pointer flex-row items-center px-4 py-2 text-sm font-medium !text-indigo-600"
                    )}
                  >
                    <PlusIcon className="mr-2 h-4 w-4" /> Create tax preset
                  </div>
                )}
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

interface IAddTaxOrDiscountProps {
  items: Tax[];
  onCreate: () => void;
  onToggle: (item: Tax) => void;
  currencySymbol?: string;
  applied: Tax[];
  button?: JSX.Element;
  dropdownClassName?: string;
}
