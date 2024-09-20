import { Button } from "@/components/ui/button";
import { profileLinks } from "@/modules/shared/utils/profile-links";
import Link from "next/link";

interface Props {
  activeLink: string;
}

export const ProfileActiveLinks = ({ activeLink }: Props) => {
  return (
    <div className="flex flex-wrap gap-6 mb-10 w-full justify-start ">
      {profileLinks.map((link) => (
        <Link href={link.href} key={link.href}>
          <Button
            size={"sm"}
            key={link.href}
            className={`text-sm cursor-pointer font-normal rounded-md capitalize text-black bg-slate-200/40 px-2 py-1 ${
              link.href.split("/")[2] === activeLink
                ? "text-white bg-honoluluBlue"
                : ""
            } hover:bg-slate-400/40 transition duration-100`}
          >
            {link.label}
          </Button>
        </Link>
      ))}
    </div>
  );
};
