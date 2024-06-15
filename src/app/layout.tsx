import './globals.css'
import {Source_Sans_3} from "next/font/google";
import React from "react";
import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "@/components/ui/sonner";
import {Navigation} from "@/modules/dashboard/navigation";

const source_sans_3 = Source_Sans_3({subsets: ["latin"]});

export const metadata = {
    title: 'Magic Apply',
    icons: {
        icon: '/images/logo.svg'
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <ClerkProvider>
            <body className={source_sans_3.className}>
            <Toaster/>
            <div>
              <Navigation />
              {children}
            </div>
            </body>
        </ClerkProvider>
        </html>
    )
}
