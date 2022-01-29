import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

export const SettingsLayout: FC<SettingsLayoutProps> = ({
  children,
  label,
  buttonText,
  onButtonClick,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-row">
      <div className="flex h-screen sticky top-0 w-56 flex-col border-r bg-white/[0.6] p-5">
        <Link href="/settings/customers">
          <a>Customers</a>
        </Link>
        <Link href="/settings/taxes">
          <a>Taxes</a>
        </Link>
      </div>
      <div className="p-5 sm:max-w-3xl">
        <div className="flex flex-row justify-between mb-5 items-center">
          <span className="text-lg font-medium leading-6 text-gray-900">
            {label}
          </span>
          <button
            onClick={onButtonClick}
            className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {buttonText}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

interface SettingsLayoutProps {
  onButtonClick: () => void;
  label: string;
  buttonText: string;
}
