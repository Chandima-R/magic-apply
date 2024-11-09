"use client";

import { Menu, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SidebarLink } from "@/modules/shared/components/sidebar-link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavButton } from "@/modules/shared/components/nav-button";
import { HeaderLogo } from "@/modules/shared/components/header-logo";
import Link from "next/link";
import { authNavLinks } from "@/modules/auth/utils/auth-nav-links";

export const AuthNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  if (isMobile) {
    return (
      <div className="flex items-center justify-between px-4 border-b z-40">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <Button
              variant="outline"
              size="sm"
              className="font-normal hover:bg-sky-100 hover:text-black border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-black focus:bg-sky-100 transition"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="px-2">
            <nav className="flex flex-col gap-y-2 pt-6">
              <div className="px-8 py-4">
                <Link href="/">
                  <div className="items-center flex">
                    <Image
                      src="/images/logo-white.png"
                      alt="logo"
                      height={500}
                      width={1500}
                      className="w-auto h-36 mx-auto"
                    />
                  </div>
                </Link>
              </div>
              <div>
                {authNavLinks.map((route: any) => (
                  <SidebarLink
                    label={route.label}
                    href={route.href}
                    icon={route.icon}
                    isActive={pathname === route.href}
                    key={route.href}
                  />
                ))}
              </div>
            </nav>

            <div className="flex flex-col gap-4 px-8">
              <Button
                className="rounded-full py-2 border-federalBlue"
                variant="outline"
              >
                Become a recruiter
              </Button>
              <Button
                className="rounded-full py-2 bg-honoluluBlue hover:bg-federalBlue text-white"
                variant="default"
              >
                Become a memebr
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <div className="items-center flex">
          <Link href="/sign-in">
            <div className="items-center flex">
              <Image
                src="/images/logo-white.png"
                alt="logo"
                height={500}
                width={1500}
                className="w-auto h-24 mx-auto"
              />
            </div>
          </Link>
        </div>
        <div className="flex gap-4">
          <Button
            className="rounded-full py-2 bg-honoluluBlue hover:bg-federalBlue text-white"
            variant="default"
          >
            Become a memebr
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center shadow-md border sticky top-0 left-0 right-0 bg-white z-40">
      <header className="w-full px-4  max-w-[1280px]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center lg:gap-x-16">
              <HeaderLogo />
              <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
                {authNavLinks.map((route: any) => (
                  <NavButton
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={pathname === route.href}
                  />
                ))}
              </nav>
            </div>

            <div className="flex gap-4">
              <Button
                className="rounded-full py-2 border-federalBlue"
                variant="outline"
              >
                Become a recruiter
              </Button>
              <Button
                className="rounded-full py-2 bg-honoluluBlue hover:bg-federalBlue text-white"
                variant="default"
              >
                Become a memebr
              </Button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
