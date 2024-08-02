import "./globals.css";
import { Source_Sans_3 } from "next/font/google";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/modules/shared/components/provider";

const source_sans_3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata = {
  title: "Magic Apply",
  icons: {
    icon: "/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={source_sans_3.className}>
          <Toaster />
          <div>
            {/* <Navigation /> */}
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
