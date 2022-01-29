import { FC } from "react";

export const TextArea: FC<TextAreaProps> = ({
  onChange,
  value,
  label,
  name,
}) => {
  return (
    <div className="mt-3">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <textarea
          rows={6}
          name={name}
          id={name}
          className="block w-full resize-none rounded-md border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

interface TextAreaProps {
  label?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  name: string;
  value: string | undefined;
}
