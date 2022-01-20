import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextProgress from "next-progress";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { SlideOver } from "../components/SlideOver";
import React from "react";
import { AddTaxPreset } from "../components/AddTaxPreset";
import { AddCustomer } from "../components/AddCustomer";

function MyApp({ Component, pageProps }: AppProps) {
  const [showAddTaxForm, setShowAddTaxForm] = React.useState(false);
  const [showAddCustomerForm, setShowAddCustomerForm] = React.useState(false);

  return (
    <div className="flex sm:flex-row">
      <NextProgress options={{ showSpinner: false }} />
      <Sidebar />
      <main className="bg-zinc-100 flex flex-1 min-h-screen p-5">
        <Component
          {...pageProps}
          setShowAddTaxForm={setShowAddTaxForm}
          setShowAddCustomerForm={setShowAddCustomerForm}
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
    </div>
  );
}
export default MyApp;
