import { CustomButton } from "@/modules/shared/components/custom-button";
import { Form } from "@/components/ui/form";
import { TextArea } from "@/modules/shared/components/text-area";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { MasterResumeActiveLink } from "./master-resume-active-link";

const skillSchema = z.object({
  skill: z.string().nonempty("Skills are required."),
});
export const Skills = () => {
  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skill: "",
    },
  });

  const onSubmit = (values: z.infer<typeof skillSchema>) => {
    if (values) {
      console.log(values);
    }
  };

  const path = usePathname();
  const activeLink = path.split("/")[2];

  return (
    <>
      <MasterResumeActiveLink activeLink={activeLink} />
      <div className={"w-full flex flex-col lg:flex-row"}>
        <div className={"w-full lg:w-1/3"}>
          <div className={"rounded-sm overflow-hidden shadow"}>
            <video className={"w-full object-cover h-auto"} controls>
              <source src={"/video/resume-builder.mp4"} />
            </video>
          </div>
        </div>
        <div className={"w-full lg:w-2/3 px-2 lg:px-6 py-4 lg:py-0"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className={"gap-4 lg:gap-8 grid grid-cols-1 w-full"}>
                <TextArea
                  fieldLabel={"Enter the skills you posses"}
                  fieldName={"skill"}
                  control={form.control}
                  placeholder={"Front End: HTML, CSS, Javascript."}
                  required={true}
                />
              </div>

              <div className={"flex justify-end w-full mt-8"}>
                <div className={"w-38"}>
                  <CustomButton type={"submit"} title={"Save to skills list"} />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
