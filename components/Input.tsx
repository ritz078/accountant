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

      <div>
        <input
          type={type}
          name={name}
          id={name}
          className={classNames(
            "focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md",
            {
              "mt-1": label,
            },
            inputClassName
          )}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
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
}
