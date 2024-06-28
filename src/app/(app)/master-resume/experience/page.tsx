import { Contact } from "@/modules/master-resume/components/contact";
import { Experience } from "@/modules/master-resume/components/experience";

export default function page() {
  return (
    <div className={"max-w-[1440px] w-full mx-auto p-8"}>
      <Experience />
    </div>
  );
}
