import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Sidebar } from "../components/Sidebar/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex sm:flex-row">
      <Sidebar />
      <main className="bg-[#f3f4f6] flex flex-1 min-h-screen p-5">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
export default MyApp;
