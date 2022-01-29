import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

export const SettingsLayout: FC<{}> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex flex-row">
      <div className="flex h-full w-56 flex-col border-r bg-white/[0.6] p-5">
        <Link href="/settings/customers"><a>Customers</a></Link>
        <Link href="/settings/taxes"><a>Taxes</a></Link>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};
