import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextProgress from "next-progress";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { SlideOver } from "../components/SlideOver";
import React from "react";
import { AddTaxPreset } from "../components/AddTaxPreset";

function MyApp({ Component, pageProps }: AppProps) {
  const [showAddTaxForm, setShowAddTaxForm] = React.useState(false);

  return (
    <div className="flex sm:flex-row">
      <NextProgress options={{ showSpinner: false }} />
      <Sidebar />
      <main className="bg-zinc-100 flex flex-1 min-h-screen p-5">
        <Component {...pageProps} setShowAddTaxForm={setShowAddTaxForm} />
      </main>

      <SlideOver
        onClose={() => setShowAddTaxForm(false)}
        open={showAddTaxForm}
        title="Add Tax"
      >
        <AddTaxPreset onClose={() => setShowAddTaxForm(false)} />
      </SlideOver>
    </div>
  );
}
export default MyApp;
