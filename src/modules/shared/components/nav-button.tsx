import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavButtonProps {
  href: string;
  label: string;
  isActive?: boolean;
}

export const NavButton = ({ href, label, isActive }: NavButtonProps) => {
  return (
    <Button
      asChild
      size={"sm"}
      variant={"outline"}
      className={cn(
        "text-md capitalize w-full lg:w-uto justify-between font-normal hover:bg-sky-100 hover:text-slate-900 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-slate-700 focus:bg-sky-100 transition",
        isActive
          ? "bg-blue-300/10 text-slate-900 font-semibold "
          : "bg-transparent"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
