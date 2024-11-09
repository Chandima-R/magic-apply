import { Toaster } from "@/components/ui/toaster";
import { GraphqlProvider } from "@/modules/shared/components/graphql-provider";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import { AuthNavbar } from "@/modules/shared/components/navbar-auth";

export const metadata = {
  title: "Magic Apply",
  icons: {
    icon: "/images/logo-white.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <GraphqlProvider>
          <body>
            <Toaster />
            <AuthNavbar />
            <div>{children}</div>
          </body>
        </GraphqlProvider>
      </ClerkProvider>
    </html>
  );
}
