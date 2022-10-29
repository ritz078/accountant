"use client";

import { SettingsLayout } from "@/components/SettingsLayout";
import React, { useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { SlideOverContext, SlideOverType } from "@/contexts/slideOver";

export default function Settings({ children }) {
  const pathname = usePathname();

  const { setSlideOver } = useContext(SlideOverContext);

  const settingLayoutProps = useMemo<
    Record<
      string,
      Omit<React.ComponentProps<typeof SettingsLayout>, "children">
    >
  >(
    () => ({
      "/settings/customers": {
        label: "Customers",
        buttonText: "Add Customer",
        onButtonClick: () => setSlideOver({ type: SlideOverType.ADD_CUSTOMER }),
      },
      "/settings/taxes": {
        label: "Taxes",
        buttonText: "Add Tax",
        onButtonClick: () =>
          setSlideOver({ type: SlideOverType.ADD_TAX_PRESET }),
      },
      "/settings/account": {
        label: "Account",
      },
    }),
    [setSlideOver]
  );

  return (
    <SettingsLayout {...settingLayoutProps[pathname]}>
      {children}
    </SettingsLayout>
  );
}
