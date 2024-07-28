"use client";

import { AppStateProvider } from "@/context/AppContext";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
export const CombinedProviders = ({ children }) => {
  return (
    <SessionProvider>
      <AppStateProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AppStateProvider>
    </SessionProvider>
  );
};
