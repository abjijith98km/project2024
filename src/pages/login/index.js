/** @format */

import Login from "@/components/Login";
import Head from "next/head";
import React from "react";

const index = () => {
  return (
    <>
      <Head>
        <title>Welcome back</title>
      </Head>
      <Login />
    </>
  );
};

export default index;
