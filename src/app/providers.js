"use client";

import { AppStateProvider } from "@/context/AppContext";

export const Providers = ({ children }) => {
  return <AppStateProvider>{children}</AppStateProvider>;
};
