import {AlignJustify, ChevronDown} from "lucide-react";

export const Navbar = () => {

    return(
        <nav className={'flex lg:hidden sticky top-0 left-0 right-0 bg-white border-b p-4 items-center justify-between shadow-sm'}>
            <div className={'cursor-pointer rounded-md border p-1 hover:shadow-sm'}>
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
