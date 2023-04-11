import "styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { createContext } from "react";
import { PopupContextProvider, UserContextProvider } from "contexts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head key={"head"}>
        <title>Discord Clone</title>
      </Head>
      <main>
        <PopupContextProvider>
          <UserContextProvider>
            <Component {...pageProps} />
          </UserContextProvider>
        </PopupContextProvider>
      </main>
    </>
  );
}
