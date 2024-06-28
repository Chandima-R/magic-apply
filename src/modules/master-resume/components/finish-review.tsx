"use client";

import { usePathname } from "next/navigation";
import { MasterResumeActiveLink } from "./master-resume-active-link";

export const FinishReview = () => {
  const path = usePathname();
  const activeLink = path.split("/")[2];

  return (
    <>
      <MasterResumeActiveLink activeLink={activeLink} />
      <div>
        <p>finish review</p>

        <button type={"submit"}>submit</button>
      </div>
    </>
  );
};
