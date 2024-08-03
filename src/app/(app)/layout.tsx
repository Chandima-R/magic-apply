import { Providers } from "@/modules/shared/components/provider";
import "../globals.css";
import { Source_Sans_3 } from "next/font/google";
import React from "react";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "User Login",
  description: "",
};
const inter = Source_Sans_3({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="#FDB600" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
