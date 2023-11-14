/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
import React, { useState } from "react";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [className, setClassName] = useState("");

  const props = {
    ...pageProps,
    className,
    setClassName,
  };

  return (
    <div>
      <Head>
        <title>CamelsHump</title>
      </Head>
      <h1 className="title">CamelsHump</h1>
      <Component {...props} />
    </div>
  );
}
