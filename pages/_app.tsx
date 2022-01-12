import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextProgress from "next-progress";
import { Sidebar } from "../components/Sidebar/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex sm:flex-row">
      <NextProgress options={{ showSpinner: false }} />
      <Sidebar />
      <main className="bg-gray-200 flex flex-1 min-h-screen p-5">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
export default MyApp;
