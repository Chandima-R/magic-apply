"use client";

import { ProfileActiveLinks } from "@/modules/master-resume/components/profile-active-links";
import { usePathname } from "next/navigation";
import PdfPage from "./pdf";

export const FinishReview = () => {
  const path = usePathname();
  const activeLink = path.split("/")[2];

  return (
    <>
      <ProfileActiveLinks activeLink={activeLink} />
      <div>
        <PdfPage />
        <button type={"submit"}>download pdf</button>
      </div>
    </>
  );
};
