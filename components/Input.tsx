import React, { FC } from "react";
import classNames from "classnames";

export const Input: FC<IInputProps> = ({
  name,
  type = "text",
  label,
  placeholder,
  value,
  className,
  onChange,
  inputClassName,
  required,
  min,
  prefix,
  error,
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-top text-red-500">*</span>}
        </label>
      )}

      <div className="relative rounded-md">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          className={classNames(
            "focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-200 rounded-md text-gray-900",
            {
              "mt-1": label,
              "pl-7": prefix,
              "text-red-500": error,
            },
            inputClassName
          )}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          min={min}
        />
      </div>
    </div>
  );
};

interface IInputProps {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  onChange: React.ChangeEventHandler;
  inputClassName?: string;
  value?: string | number;
  required?: boolean;
  min?: number;
  prefix?: string;
  error?: boolean | string;
}
