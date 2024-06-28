import { Contact } from "@/modules/master-resume/components/contact";
import { Skills } from "@/modules/master-resume/components/skills";
import { Summary } from "@/modules/master-resume/components/summary";

export default function page() {
  return (
    <div className={"max-w-[1440px] w-full mx-auto p-8"}>
      <Summary />
    </div>
  );
}
