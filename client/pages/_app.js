import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <title>Royal Krishna Coaching</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
