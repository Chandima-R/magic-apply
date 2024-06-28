import { Certifications } from "@/modules/master-resume/components/certifications";
import { Contact } from "@/modules/master-resume/components/contact";
import { Coursework } from "@/modules/master-resume/components/coursework";
import { Education } from "@/modules/master-resume/components/education";
import { Experience } from "@/modules/master-resume/components/experience";
import { Involvements } from "@/modules/master-resume/components/involvements";
import { Project } from "@/modules/master-resume/components/project";

export default function page() {
  return (
    <div className={"max-w-[1440px] w-full mx-auto p-8"}>
      <Involvements />
    </div>
  );
}
