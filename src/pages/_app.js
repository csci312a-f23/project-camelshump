/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
import React, { useState } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [className, setClassName] = useState("");

  const props = {
    ...pageProps,
    className,
    setClassName,
  };

  return (
    <div>
      <h1 className="title"> </h1>
      <Component {...props} />
    </div>
  );
}
