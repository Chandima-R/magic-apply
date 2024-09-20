import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  link: string;
  icon: LucideIcon;
}

export const CustomButtonCard = ({ title, link, icon }: Props) => {
  const Icon = icon;
  return (
    <Link
      href={`/${link}`}
      className="h-60 w-full rounded p-4 flex items-center flex-col justify-center hover:shadow cursor-pointer duration-150 hover:bg-sky-50 hover:border-honoluluBlue border-[1px]"
    >
      <Icon className="size-6 text-honoluluBlue" />
      <p className="capitalize font-normal text-xl text-center">{title}</p>
    </Link>
  );
};
