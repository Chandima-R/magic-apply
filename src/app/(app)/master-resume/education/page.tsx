import { Contact } from "@/modules/master-resume/components/contact";
import { Education } from "@/modules/master-resume/components/education";
import { Experience } from "@/modules/master-resume/components/experience";
import { Project } from "@/modules/master-resume/components/project";

export default function page() {
  return (
    <div className={"max-w-[1440px] w-full mx-auto p-8"}>
      <Education />
    </div>
  );
}
