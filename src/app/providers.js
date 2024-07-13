"use client";

import { AppStateProvider } from "@/context/AppContext";
import { SessionProvider } from "next-auth/react";

export const CombinedProviders = ({ children }) => {
  return (
    <SessionProvider>
      <AppStateProvider>{children}</AppStateProvider>
    </SessionProvider>
  );
};
