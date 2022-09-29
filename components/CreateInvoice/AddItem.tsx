import { Menu, Transition } from "@headlessui/react";
import { PlusIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment } from "react";
import classNames from "classnames";
import { formatNumber } from "@/utils/number";
import { InvoiceItem } from "@prisma/client";

export const AddItem: FC<IAddItemProps> = ({
  items,
  onCreate,
  onSelect,
  button,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          {button || (
            <div className="inline-flex items-center rounded-full border border-indigo-300 bg-indigo-100 px-4 py-1.5 text-sm font-medium leading-5 text-indigo-600 shadow-sm hover:bg-indigo-200 focus:outline-none">
              <PlusSmallIcon
                className={"-ml-1.5 mr-1 h-5 w-5 text-indigo-600"}
                aria-hidden="true"
              />
              Add Item
            </div>
          )}
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
        <Menu.Items className="absolute left-0 z-10 mt-2 max-h-72 w-80 origin-top-left overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item
                as={"div"}
                key={item.id}
                onClick={() => onSelect(item)}
              >
                <div className="cursor-pointer px-4 py-2 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="text-sm text-gray-400">
                        $ {formatNumber(item.unitPrice)}
                      </p>
                    </div>
                  </div>
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
                    <PlusIcon className="mr-2 h-4 w-4" /> Create new Item
                  </div>
                )}
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

interface IAddItemProps {
  items: InvoiceItem[];
  onCreate: () => void;
  onSelect: (item: InvoiceItem) => void;
  button?: JSX.Element;
}
