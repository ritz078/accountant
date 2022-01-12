import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import React, { FC, Fragment } from "react";
import classNames from "classnames";

export const onRenderOptionDefault = (
  option: IOption,
  { selected, active }: { selected: boolean; active: boolean }
) => (
  <>
    <span
      className={classNames(
        selected ? "font-semibold" : "font-normal",
        "block truncate"
      )}
    >
      {option.name}
    </span>

    {selected ? (
      <span
        className={classNames(
          active ? "text-white" : "text-indigo-600",
          "absolute inset-y-0 right-0 flex items-center pr-4"
        )}
      >
        <CheckIcon className="h-4 w-4" aria-hidden="true" />
      </span>
    ) : null}
  </>
);

export function Select<T extends IOption = IOption>({
  value,
  onChange,
  options,
  placeholder,
  label,
  required,
  labelClassName,
  buttonClassName,
  onRenderOption = onRenderOptionDefault,
  onRenderLabel,
  error,
}: ISelectProps<T>) {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Label
            className={classNames(
              "block text-sm font-medium text-gray-700",
              labelClassName
            )}
          >
            {label}{" "}
            {required && <span className="text-top text-red-500">*</span>}
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button
              className={classNames(
                "bg-white relative w-full border border-gray-200 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                buttonClassName,
                {
                  "border-red-500": error,
                }
              )}
            >
              <span className="block truncate">
                {onRenderLabel?.(value) || value?.name || placeholder}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) =>
                      onRenderOption(option, { selected, active })
                    }
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export interface IOption {
  name: string;
  id: string | number;
}

interface ISelectProps<T> {
  onChange: (selected: T) => void;
  options: T[];
  value?: T | null;
  placeholder?: string;
  label?: string;
  required?: boolean;
  labelClassName?: string;
  buttonClassName?: string;
  onRenderOption?: (
    option: T,
    options: {
      selected: boolean;
      active: boolean;
    }
  ) => JSX.Element;
  onRenderLabel?: (selected?: T | null) => JSX.Element | null;
  error?: boolean | string;
}
