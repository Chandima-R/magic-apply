import Image from "next/image";
import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image
          src={"/images/logo-white.png"}
          alt="logo"
          height={28}
          width={74}
          className="w-full"
        />
      </div>
    </Link>
  );
};
