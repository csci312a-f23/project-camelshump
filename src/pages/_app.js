/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>CamelsHump</title>
      </Head>
      <h1 className="title">CamelsHump</h1>
      <Component {...pageProps} />
    </div>
  );
}
