'use client'
import React from "react";
import { PrivyProvider } from "@privy-io/react-auth";

function PrivyContext({ children }) {
  return (
    <>
      <PrivyProvider
        appId="cmcc926gd013mkw0mqlr03rng"
        clientId="client-WY6N2jwgrXsckKCDGbJV6dY8DpH7KSyQiLpNVPyWELcf1"
      >
        {children}
      </PrivyProvider>
    </>
  );
}

export default PrivyContext;
