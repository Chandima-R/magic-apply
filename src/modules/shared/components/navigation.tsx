"use client";

import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { CheckCircle, Crown, Loader2, Menu, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/modules/dashboard/utils/sidebarLinks";
import { SidebarLink } from "@/modules/shared/components/sidebar-link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavButton } from "@/modules/shared/components/nav-button";
import { HeaderLogo } from "@/modules/shared/components/header-logo";
import Link from "next/link";

import { useUser } from "@clerk/nextjs";
import { useSubscription } from "@apollo/client";
import { GET_USER } from "@/graphql/user";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);
  const { user } = useUser();

  const { data: userData, loading: userLoading } = useSubscription(GET_USER);

  const activeUser = userData?.user?.find(
    (existingUser: any) => existingUser.user_clerk_id === user?.id
  );

  const userPlan = activeUser?.user_plan?.toLowerCase();

  const links = sidebarLinks(userPlan);

  if (isMobile) {
    return (
      <div className={"flex items-center justify-between p-4 border-b z-40"}>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <Button
              variant={"outline"}
              size="sm"
              className="font-normal hover:bg-sky-100 hover:text-blak border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-black focus:bg-sky-100 transtion"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="px-2">
            <nav className="flex flex-col gap-y-2 pt-6">
              <div className={"px-8 py-4"}>
                <Link href="/">
                  <div className="items-center flex">
                    <Image
                      src={"/images/logo.svg"}
                      alt="logo"
                      height={28}
                      width={28}
                    />
                    <p className="font-semibold text-slate-900 text-2xl ml-2.5">
                      MagicApply
                    </p>
                  </div>
                </Link>
              </div>

              {/* <div>
                <Button
                  className={
                    "w-full h-10 uppercase bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue"
                  }
                >
                  create new resume
                </Button>
              </div> */}

              <div>
                {links.map((route) => (
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
          </SheetContent>
        </Sheet>
        <div className="items-center flex">
          <Link href="/">
            <div className="items-center flex">
              <Image
                src={"/images/logo.svg"}
                alt="logo"
                height={28}
                width={28}
              />
              <p className="font-semibold text-slate-900 text-2xl ml-2.5">
                MagicApply
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-y-4">
            {userPlan === "free" && (
              <div className="flex items-center">
                <Star className="w-6 h-6 text-blue-500" />
                <span className="ml-2">Free</span>
              </div>
            )}

            {userPlan === "basic" && (
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="ml-2">Basic</span>
              </div>
            )}

            {userPlan === "premium" && (
              <div className="flex items-center">
                <Crown className="w-6 h-6 text-yellow-500" />
                <span className="ml-2">Premium</span>
              </div>
            )}
          </div>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin size-8 text-slate-400" />
          </ClerkLoading>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        "w-full flex items-center justify-center shadow-md border sticky top-0 left-0 right-0 bg-white z-40"
      }
    >
      <header className="w-full px-4 py-8 max-w-[1280px]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center lg:gap-x-16">
              <HeaderLogo />
              <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
                {links.map((route) => (
                  <NavButton
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={pathname === route.href}
                  />
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-y-4">
                {userPlan === "free" && (
                  <div className="flex items-center">
                    <Star className="w-6 h-6 text-blue-500" />
                    <span className="ml-2">Free</span>
                  </div>
                )}

                {userPlan === "basic" && (
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="ml-2">Basic</span>
                  </div>
                )}

                {userPlan === "premium" && (
                  <div className="flex items-center">
                    <Crown className="w-6 h-6 text-yellow-500" />
                    <span className="ml-2">Premium</span>
                  </div>
                )}
              </div>
              <ClerkLoaded>
                <UserButton afterSignOutUrl="/sign-in" />
              </ClerkLoaded>
              <ClerkLoading>
                <Loader2 className="animate-spin size-8 text-slate-400" />
              </ClerkLoading>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
