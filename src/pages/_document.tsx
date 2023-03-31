import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <>
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <meta
            name="google-site-verification"
            content="lirRLS53NRFDILy-KzmKtZHZmfRiilm6zVSdKVfh6m0"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </>
  );
}
