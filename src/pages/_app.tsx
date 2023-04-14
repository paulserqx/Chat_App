import "styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "services";
import { UserContextProvider } from "contexts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head key={"head"}>
        <title>Discord Clone</title>
      </Head>
      <main>
        <Provider store={store}>
          <UserContextProvider>
            <Component {...pageProps} />
          </UserContextProvider>
        </Provider>
      </main>
    </>
  );
}
