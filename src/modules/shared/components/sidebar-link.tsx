import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
    label: string;
    href: string;
    icon: LucideIcon;
    isActive?: boolean
}

export const SidebarLink = ({ label, href, icon, isActive }: Props) => {
    const Icon = icon;
    return (
        <Link
            href={href}
            className={cn('mb-2 text-md capitalize w-full lg:w-auto p-4 font-normal hover:bg-slate-500/20 hover:text-slate-900 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-slate-700 focus:bg-black/30 transition rounded-md flex items-center justify-start gap-2', isActive ? 'bg-blue-500/20 text-slate-900 font-semibold ' : 'bg-transparent')}>
            <Icon
                className={'size-4'}
            />
            <p>{label}</p>
        </Link>
    )
}
