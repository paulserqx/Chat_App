import "styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="lirRLS53NRFDILy-KzmKtZHZmfRiilm6zVSdKVfh6m0"
        />
        <title>Discord Clone</title>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
