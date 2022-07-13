import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextProgress from "next-progress";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { SlideOver } from "@/components/SlideOver";
import React from "react";
import { AddTaxPreset } from "@/components/AddTaxPreset";
import { AddCustomer } from "@/components/AddCustomer";
import { AddItemForm } from "@/components/AddItemForm";
import { useMeta } from "@/data/useMeta";
import { useCustomers } from "@/data/customer";
import classNames from "classnames";
import { useRouter } from "next/router";
import { SlideOverContext, SlideOverType } from "@/contexts/slideOver";

function MyApp({ Component, pageProps }: AppProps) {
  const { data } = useMeta();
  useCustomers();
  const router = useRouter();

  const [slideOver, setSlideOver] = React.useState<
    Omit<React.ContextType<typeof SlideOverContext>, "setSlideOver">
  >({
    type: SlideOverType.NONE,
  });

  const closeSlider = () => {
    setSlideOver({ type: SlideOverType.NONE, payload: undefined });
  };

  if (!data) return <NextProgress />;

  return (
    <SlideOverContext.Provider
      value={{
        ...slideOver,
        setSlideOver,
      }}
    >
      <div className="flex sm:flex-row">
        <NextProgress height={4} options={{ showSpinner: false }} />
        <Sidebar />
        <main
          className={classNames("flex min-h-screen flex-1 bg-zinc-100", {
            "p-5": !router.pathname.startsWith("/settings"),
          })}
        >
          <Component {...pageProps} />
        </main>

        <SlideOver
          onClose={closeSlider}
          open={
            slideOver.type === SlideOverType.ADD_TAX_PRESET ||
            slideOver.type === SlideOverType.EDIT_TAX_PRESET
          }
          title={
            slideOver.type === SlideOverType.ADD_TAX_PRESET
              ? "Add Tax Preset"
              : "Edit Tax Preset"
          }
        >
          <AddTaxPreset taxId={slideOver.payload} onClose={closeSlider} />
        </SlideOver>

        <SlideOver
          onClose={closeSlider}
          open={
            slideOver.type === SlideOverType.ADD_CUSTOMER ||
            slideOver.type === SlideOverType.EDIT_CUSTOMER
          }
          title={
            slideOver.type === SlideOverType.ADD_CUSTOMER
              ? "Add Customer"
              : "Edit Customer"
          }
        >
          <AddCustomer
            onClose={() =>
              setSlideOver({
                type: SlideOverType.NONE,
              })
            }
            customerId={slideOver.payload}
          />
        </SlideOver>

        <SlideOver
          open={slideOver.type === SlideOverType.ADD_ITEM}
          onClose={closeSlider}
          title="Add Item"
        >
          <AddItemForm onClose={closeSlider} />
        </SlideOver>
      </div>
    </SlideOverContext.Provider>
  );
}

export default MyApp;
