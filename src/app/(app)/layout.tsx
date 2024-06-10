import type { Metadata } from "next";
import {Source_Sans_3} from "next/font/google";
import "../globals.css";
import {Navbar} from "@/modules/shared/components/navbar";

const source_sans_3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata : Metadata= {
  title: 'Magic Apply',
  icons: {
    icon: '/images/logo.svg'
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={source_sans_3.className}>
      <Navbar />
      <div>
        {children}
      </div>
      </body>
    </html>
  );
}
