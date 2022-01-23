import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, PlusIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";
import classNames from "classnames";
import { ITaxOrDiscount } from "@/types/invoice";

function getTaxLabel(tax: ITaxOrDiscount, currencySymbol?: string) {
  return (
    tax.name +
    " (" +
    (tax.type === "percentage"
      ? `${tax.value}%)`
      : `${currencySymbol} ${tax.value})`)
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
          <div className="mt-2 flex flex-row mr-2">
            {button || (
              <div className="text-gray-500 flex flex-row items-center text-xs py-1 px-2 rounded-md bg-teal-100 text-teal-600 cursor-pointer hover:bg-teal-200 hover:text-teal-700">
                {applied.length
                  ? applied
                      .map((tax) => getTaxLabel(tax, currencySymbol))
                      .join(", ")
                  : "Add Tax"}{" "}
                <PlusIcon className="w-3 h-3 ml-1" />
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
            "origin-top-left absolute left-0 z-10 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-64 overflow-y-auto bottom-10",
            dropdownClassName
          )}
        >
          <div className="py-1">
            {items.map((tax, index) => (
              <Menu.Item as={"div"} key={tax.id} onClick={() => onToggle(tax)}>
                <div className="flex cursor-pointer hover:bg-gray-50 flex-row items-center justify-between px-4 py-2">
                  <span className="text-sm">
                    {getTaxLabel(tax, currencySymbol)}
                  </span>

                  {applied.some((aTax) => aTax.id === tax.id) && (
                    <CheckIcon className="w-5 h-5" />
                  )}
                </div>
              </Menu.Item>
            ))}

            <div className="pt-1 border-t mt-1 border-gray-100">
              <Menu.Item onClick={onCreate}>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 flex flex-row cursor-pointer items-center text-sm font-medium !text-indigo-600"
                    )}
                  >
                    <PlusIcon className="w-4 h-4 mr-2" /> Create tax preset
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
  items: ITaxOrDiscount[];
  onCreate: () => void;
  onToggle: (item: ITaxOrDiscount) => void;
  currencySymbol?: string;
  applied: ITaxOrDiscount[];
  button?: JSX.Element;
  dropdownClassName?: string;
}
