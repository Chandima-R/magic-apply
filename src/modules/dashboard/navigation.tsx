'use client'

import {ClerkLoaded, ClerkLoading, UserButton} from "@clerk/nextjs";
import {AlignJustify, Loader2, Menu, X} from "lucide-react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {sidebarLinks} from "@/modules/dashboard/sidebarLinks";
import {SidebarLink} from "@/modules/shared/components/sidebar-link";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useMedia} from "react-use";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {NavButton} from "@/modules/shared/components/nav-button";
import {HeaderLogo} from "@/modules/shared/components/header-logo";
import Link from "next/link";
import {cn} from "@/lib/utils";

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const isMobile = useMedia("(max-width: 1024px", false)

    const onclick = (href: string) => {
        router.push(href)
        setIsOpen(false)
    }

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Button
                        variant={'outline'}
                        size='sm'
                        className="font-normal hover:bg-black/20 hover:text-blak border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-black focus:bg-black/30 transtion"
                    >
                        <Menu className="size-4"/>
                    </Button>
                </SheetTrigger>
                <SheetContent side={'left'} className="px-2">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        <div className={'px-8 py-4'}>
                            <Link href='/'>
                                <div className="items-center flex">
                                    <Image
                                        src={'/images/logo.svg'}
                                        alt="logo"
                                        height={28}
                                        width={28}
                                    />
                                    <p className="font-semibold text-slate-900 text-2xl ml-2.5">MagicApply</p>
                                </div>
                            </Link>
                        </div>

                        {sidebarLinks.map((route) => (
                            // <Button
                            //     key={route.href}
                            //     variant={route.href === pathname ? 'secondary' : 'ghost'}
                            //     onClick={() => onclick(route.href)}
                            //     className={cn('text-md capitalize w-full lg:w-auto justify-between font-normal hover:bg-slate-500/20 hover:text-slate-900 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-slate-700 focus:bg-black/30 transition rounded-none', pathname === route.href ? 'bg-blue-500/20 text-slate-900 font-semibold ' : 'bg-transparent')}
                            // >
                            //     <LucideIcon
                            //     {route.label}
                            // </Button>
                            <SidebarLink label={route.label} href={route.href} icon={route.icon} isActive={pathname === route.href} key={route.href}/>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <div className={'w-full flex items-center justify-between shadow-sm border'}>
            <header className="w-full px-4 py-8 lg:px-14">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="w-full flex items-center justify-between mb-8">
                        <div className="flex items-center lg:gap-x-16">
                            <HeaderLogo/>
                            <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
                                {sidebarLinks.map((route) => (
                                    <NavButton
                                        key={route.href}
                                        href={route.href}
                                        label={route.label}
                                        isActive={pathname === route.href}
                                    />
                                ))}
                            </nav>
                        </div>
                        <ClerkLoaded>
                            <UserButton afterSignOutUrl="/sign-in"/>
                        </ClerkLoaded>
                        <ClerkLoading>
                            <Loader2 className="animate-spin size-8 text-slate-400"/>
                        </ClerkLoading>
                    </div>
                    {/*<WelcomeMessage/>*/}
                </div>
            </header>
        </div>
    )
}
