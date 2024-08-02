"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import TRPCProvider from "./trpc-provider";
import { Toaster } from "@/components/ui/toaster";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <TRPCProvider>
        <Toaster />
        {children}
      </TRPCProvider>
    </SessionProvider>
  );
}
