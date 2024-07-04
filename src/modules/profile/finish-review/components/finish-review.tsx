"use client";

import { ProfileActiveLinks } from "@/modules/master-resume/components/profile-active-links";
import { usePathname } from "next/navigation";

export const FinishReview = () => {
  const path = usePathname();
  const activeLink = path.split("/")[2];

  return (
    <>
      <ProfileActiveLinks activeLink={activeLink} />
      <div>
        <p>finish review</p>

        <button type={"submit"}>submit</button>
      </div>
    </>
  );
};
