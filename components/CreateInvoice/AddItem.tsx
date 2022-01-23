import { Menu, Transition } from "@headlessui/react";
import { PlusIcon, PlusSmIcon } from "@heroicons/react/outline";
import React, { FC, Fragment } from "react";
import classNames from "classnames";
import { formatNumber } from "@/utils/number";
import { IItem } from "@/types/invoice";

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
            <div className="bg-indigo-100 inline-flex items-center shadow-sm px-4 py-1.5 border border-indigo-300 hover:bg-indigo-200 text-sm leading-5 font-medium rounded-full text-indigo-600 focus:outline-none">
              <PlusSmIcon
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
        <Menu.Items className="origin-top-left absolute left-0 z-10 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-72 overflow-y-auto">
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item
                as={"div"}
                key={item.id}
                onClick={() => onSelect(item)}
              >
                <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="text-sm text-gray-400">
                        $ {formatNumber(item.price)}
                      </p>
                    </div>
                  </div>
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
                    <PlusIcon className="w-4 h-4 mr-2" /> Create new Item
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
  items: IItem[];
  onCreate: () => void;
  onSelect: (item: IItem) => void;
  button?: JSX.Element;
}
