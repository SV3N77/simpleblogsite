import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="grow bg-zinc-50">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
