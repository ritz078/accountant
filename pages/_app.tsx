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

function MyApp({ Component, pageProps }: AppProps) {
  const { data } = useMeta();

  const [showAddTaxForm, setShowAddTaxForm] = React.useState(false);
  const [showAddCustomerForm, setShowAddCustomerForm] = React.useState(false);
  const [showAddItemForm, setShowAddItemForm] = React.useState(false);

  if (!data) return <NextProgress />;

  return (
    <div className="flex sm:flex-row">
      <NextProgress options={{ showSpinner: false }} />
      <Sidebar />
      <main className="flex min-h-screen flex-1 bg-zinc-100 p-5">
        <Component
          {...pageProps}
          setShowAddTaxForm={setShowAddTaxForm}
          setShowAddCustomerForm={setShowAddCustomerForm}
          setShowAddItemForm={setShowAddItemForm}
        />
      </main>

      <SlideOver
        onClose={() => setShowAddTaxForm(false)}
        open={showAddTaxForm}
        title="Add Tax"
      >
        <AddTaxPreset onClose={() => setShowAddTaxForm(false)} />
      </SlideOver>

      <SlideOver
        onClose={() => setShowAddCustomerForm(false)}
        open={showAddCustomerForm}
        title="Add Customer"
      >
        <AddCustomer onClose={() => setShowAddCustomerForm(false)} />
      </SlideOver>

      <SlideOver
        open={showAddItemForm}
        onClose={() => setShowAddItemForm(false)}
        title="Add Item"
      >
        <AddItemForm onClose={() => setShowAddItemForm(false)} />
      </SlideOver>
    </div>
  );
}

export default MyApp;

export interface ComponentProps {
  setShowAddTaxForm: (show: boolean) => void;
  setShowAddCustomerForm: (show: boolean) => void;
  setShowAddItemForm: (show: boolean) => void;
}
