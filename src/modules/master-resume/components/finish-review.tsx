"use client";

import { usePathname } from "next/navigation";
import { ProfileActiveLinks } from "./profile-active-links";

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
