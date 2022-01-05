import { Menu, Transition } from "@headlessui/react";
import { PlusIcon, PlusSmIcon } from "@heroicons/react/outline";
import React, { FC, Fragment } from "react";
import classNames from "classnames";
import { IItem } from "./CreateInvoice";

export const AddItem: FC<IAddItemProps> = ({
  items,
  onCreate,
  onSelect,
  minimal,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-indigo-100 inline-flex items-center shadow-sm px-4 py-1.5 border border-indigo-300 hover:bg-indigo-200 text-sm leading-5 font-medium rounded-full text-indigo-600 focus:outline-none">
          <PlusSmIcon
            className={classNames(
              {
                "mr-0 ml-0": minimal,
              },
              "-ml-1.5 mr-1 h-5 w-5 text-indigo-600"
            )}
            aria-hidden="true"
          />
          {!minimal && <span>Add Item</span>}
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item
                as={"div"}
                key={item.id}
                onClick={() => onSelect(item)}
              >
                {items.map((position) => (
                  <div
                    key={position.id}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">
                        {position.name}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          $ {position.price}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="flex items-center text-sm text-gray-500">
                        {position.description}
                      </p>
                    </div>
                  </div>
                ))}
              </Menu.Item>
            ))}

            <div className="pt-1 border-t mt-1 border-gray-100">
              <Menu.Item onClick={onCreate}>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 flex flex-row cursor-pointer items-center text-sm font-medium text-indigo-600"
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
  minimal?: boolean;
}
