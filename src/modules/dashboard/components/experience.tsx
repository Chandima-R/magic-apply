import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/modules/shared/components/text-input";
import { TextArea } from "@/modules/shared/components/text-area";
import { CustomButton } from "@/modules/shared/components/custom-button";
import { CalendarField } from "@/modules/shared/components/calendar.-field";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useMutation, useSubscription } from "@apollo/client";
import { CONTACT_INFORMATION } from "@/graphql/contact";
import {
  ADD_NEW_EXPERIENCE,
  EXPERIENCE_INFORMATION,
} from "@/graphql/experience";
import { LoadingButton } from "@/modules/shared/loading-button";
import { ExperienceCard } from "./experience-card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const experienceSchema = z.object({
  role: z.string().nonempty("Role is required."),
  company: z.string().nonempty("Company is required."),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date({
    required_error: "end date is required.",
  }),
  companyLocation: z.string().nonempty("Company Location is required."),
  jobDescription: z.string().nonempty("Job description is required."),
});
export const Experience = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const { data: contactData } = useSubscription(CONTACT_INFORMATION);
  const contactDetails =
    contactData?.contact?.find((c: any) => c?.user_id === user?.id) || {};

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      role: "",
      company: "",
      startDate: new Date(),
      endDate: new Date(),
      companyLocation: "",
      jobDescription: "",
    },
  });

  const [addExperience] = useMutation(ADD_NEW_EXPERIENCE);
  const { data: experienceData } = useSubscription(EXPERIENCE_INFORMATION);

  async function onSubmit(values: z.infer<typeof experienceSchema>) {
    console.log(45, values);
    try {
      if (!user?.id) {
        throw new Error("User is not authenticated");
      } else {
        await addExperience({
          variables: {
            company_end_date: values.endDate,
            company_location: values.companyLocation,
            company_name: values.company,
            company_role: values.role,
            company_role_description: values.jobDescription,
            company_start_date: values.startDate,
            user_id: user?.id,
          },
        });
      }
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={"w-full flex flex-col lg:flex-row"}>
      <div className={"w-full lg:w-1/3"}>
        <div className={"rounded-sm overflow-hidden shadow mb-4"}>
          <video className={"w-full object-cover h-auto"} controls>
            <source src={"/video/resume-builder.mp4"} />
          </video>
        </div>
        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="experience"
          >
            <AccordionItem value="experience">
              <AccordionTrigger className="text-xl font-semibold capitalize">
                your experience
              </AccordionTrigger>
              {experienceData?.experience?.map((exp: any) => (
                <AccordionContent>
                  <ExperienceCard
                    company={exp.company_name}
                    role={exp.company_role}
                  />
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className={"w-full lg:w-2/3 px-2 lg:px-6  py-4 lg:py-0"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div
              className={
                "gap-4 lg:gap-8 grid grid-cols-1 lg:grid-cols-2 w-full"
              }
            >
              <TextInput
                fieldLabel={"What was the your role at the company?"}
                fieldName={"role"}
                control={form.control}
                placeholder={"Marketing Analyst"}
                required={true}
              />
              <TextInput
                fieldLabel={"For which company did you work?"}
                fieldName={"company"}
                control={form.control}
                placeholder={"Google"}
                required={true}
              />
              <CalendarField
                fieldLabel={"Start date"}
                fieldName={"startDate"}
                control={form.control}
                placeholder={"city"}
                required={true}
              />
              <CalendarField
                fieldLabel={"End date"}
                fieldName={"endDate"}
                control={form.control}
                placeholder={"city"}
                required={true}
              />
              <TextInput
                fieldLabel={"Where is the company located?"}
                fieldName={"companyLocation"}
                control={form.control}
                placeholder={"New York, NY"}
                required={true}
              />
            </div>
            <div className={"mt-4 lg:mt-8 "}>
              <TextArea
                fieldLabel={"What did you do at the company"}
                fieldName={"jobDescription"}
                control={form.control}
                placeholder={
                  "Organized and implemented Google Analytics dta tracking campaigns to maximize the effectiveness of emil remarketing initiatives that were deployed using Salesforce&rsquo;s marketing cloud software. "
                }
                required={true}
              />
            </div>

            <div className="flex justify-end w-full mt-8">
              <div className="w-38">
                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <>
                    {experienceData?.experience?.length >= 5 ? (
                      <CustomButton
                        disabled
                        type="submit"
                        title="Save to experience list"
                      />
                    ) : (
                      <CustomButton
                        type="submit"
                        title="Save to experience list"
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
