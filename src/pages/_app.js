/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
import React, { useState } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import LoginWidget from "../components/LoginWidget";

export default function App({ session, Component, pageProps }) {
  const [className, setClassName] = useState("");
  const [currentId, setCurrentId] = useState();
  const router = useRouter();

  const props = {
    ...pageProps,
    className,
    setClassName,
    currentId,
    setCurrentId,
  };

  return (
    <div>
      <SessionProvider session={session}>
        <Head>
          <title>CamelsHump</title>
        </Head>
        <div className="header">
          <h1 className="title" onClick={() => router.push("/")}>
            CamelsHump
          </h1>
          <LoginWidget />
        </div>
        <Component {...props} />
      </SessionProvider>
    </div>
  );
}
