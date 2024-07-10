"use client";

import { AppStateProvider } from "@/context/AppContext";

// export const Providers = ({ children }) => {
//   return <AppStateProvider>{children}</AppStateProvider>;
// };

import { SessionProvider } from "next-auth/react";

export const Provider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
