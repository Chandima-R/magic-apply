'use client'

import {AlignJustify, ChevronDown} from "lucide-react";
import {useState} from "react";
import {Sidebar} from "@/modules/shared/components/sidebar";

export const Navbar = () => {
    const[openSidebar, setOpenSidebar] = useState<boolean>(false)

    const menuOnClick = () => {
        console.log(openSidebar)
        setOpenSidebar(!openSidebar)
    }

    return(
        <nav className={'flex lg:hidden sticky top-0 left-0 right-0 bg-white border-b p-4 items-center justify-between shadow-sm z-10'}>
            {openSidebar && (
                <Sidebar />
            )}
            <div className={'cursor-pointer rounded-md border p-1 hover:shadow-sm'} onClick={menuOnClick}>
                <AlignJustify  className={'size-4'}/>
            </div>

            <div>
                <p className={'text-xl font-bold text-slate-700'}>MagicApply</p>
            </div>

            <div className={'flex items-center gap-2 cursor-pointer'}>
                <div className={'rounded-full bg-slate-400 h-8 w-8'} />
                <ChevronDown className={'size-4'} />
            </div>
        </nav>
    )
}
