"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/modules/shared/components/text-input";
import { TextArea } from "@/modules/shared/components/text-area";
import { CustomButton } from "@/modules/shared/components/custom-button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useMutation, useSubscription } from "@apollo/client";
import {
  ADD_NEW_EXPERIENCE_BY_USER_ID,
  DELETE_EXPERIENCE_BY_PK,
  EXPERIENCE_INFORMATION_BY_USER_ID,
  HIDE_EXPERIENCE_BY_PK,
} from "@/graphql/experience";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";
import { CalendarField } from "@/modules/shared/components/calendar-field";
import { LoadingButton } from "@/modules/shared/components/loading-button";
import { usePathname } from "next/navigation";
import { ProfileActiveLinks } from "@/modules/shared/components/profile-active-links";
import { ActionCard } from "@/modules/shared/components/action-card";

const experienceSchema = z
  .object({
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
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "Start date must be before end date",
    path: ["endDate"],
  });

export const Experience = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

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

  const { data: experienceData, loading: expoerienceLoading } = useSubscription(
    EXPERIENCE_INFORMATION_BY_USER_ID,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  const visibleExperience = experienceData?.experience?.filter(
    (exp: any) => exp.visibility === true
  );

  const hiddenExperience = experienceData?.experience?.filter(
    (exp: any) => exp.visibility === false
  );

  const allExperience = experienceData?.experience?.map((e: any) => e);

  const hiddenExperienceLength =
    allExperience?.length - visibleExperience?.length;

  const [addExperience] = useMutation(ADD_NEW_EXPERIENCE_BY_USER_ID);
  async function onSubmit(values: z.infer<typeof experienceSchema>) {
    try {
      setIsLoading(true);
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

        toast({
          variant: "default",
          title: "Success.",
          description: "Your project was added to project list.",
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

  const [deleteExperience] = useMutation(DELETE_EXPERIENCE_BY_PK);
  const deleteExperienceAction = async (id: string) => {
    try {
      await deleteExperience({
        variables: {
          id,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your project was deleted from the project list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error deleting the experience.",
      });
    }
  };

  const [hideExperience] = useMutation(HIDE_EXPERIENCE_BY_PK);
  const hideExperienceAction = async (id: string) => {
    try {
      await hideExperience({
        variables: {
          id,
          visibility: false,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your project was hide from the project list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error deleting the experience.",
      });
    }
  };

  const unhideExperienceAction = async (id: string) => {
    try {
      await hideExperience({
        variables: {
          id,
          visibility: true,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your project was hide from the project list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error deleting the experience.",
      });
    }
  };

  const path = usePathname();
  const activeLink = path.split("/")[2];

  return (
    <>
      <ProfileActiveLinks activeLink={activeLink} />
      <div className={"w-full flex flex-col lg:flex-row"}>
        <div className={"w-full lg:w-1/3"}>
          <div className={"rounded-sm overflow-hidden shadow mb-4"}>
            <video className={"w-full object-cover h-auto"} controls>
              <source src={"/video/resume-builder.mp4"} />
            </video>
          </div>
          <div>
            {expoerienceLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {experienceData?.experience?.length > 0 && (
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
                      {hiddenExperienceLength ? (
                        <span>
                          You have {hiddenExperienceLength} hidden experience(s)
                          in your bucket.
                        </span>
                      ) : (
                        ""
                      )}
                      {visibleExperience?.map((exp: any) => (
                        <AccordionContent key={exp.id}>
                          <ActionCard
                            id={exp.id}
                            company={exp.company_name}
                            role={exp.company_role}
                            country={exp.company_location}
                            fromDate={exp.company_start_date}
                            toDate={exp.company_end_date}
                            deleteTitle={"Delete your experience."}
                            deleteDescription={
                              "Are you sure to delete this experience. This action cannot be undone and it will completely remove this experience from your experience list."
                            }
                            deleteAction={() => deleteExperienceAction(exp.id)}
                            hideTitle={"Hide your experience."}
                            hideDescription={
                              "Are you sure to hide this experience. This action cannot be undone and it will completely hide this experience from your experience list."
                            }
                            hideAction={() => hideExperienceAction(exp.id)}
                            status={exp.visibility}
                            tab={"experience"}
                          />
                        </AccordionContent>
                      ))}
                    </AccordionItem>

                    {hiddenExperienceLength > 0 && (
                      <AccordionItem value="hidden-experience">
                        <AccordionTrigger className="text-xl font-semibold capitalize flex justify-between gap-2">
                          <div>
                            hidden experience{" "}
                            <span
                              className={
                                "text-sm lowercase text-slate-600 font-normal"
                              }
                            >
                              ({hiddenExperienceLength} hidden certificate(s))
                            </span>
                          </div>
                        </AccordionTrigger>
                        {hiddenExperience?.map((exp: any) => (
                          <AccordionContent key={exp.id}>
                            <ActionCard
                              id={exp.id}
                              company={exp.company_name}
                              role={exp.company_role}
                              country={exp.company_location}
                              fromDate={exp.company_start_date}
                              toDate={exp.company_end_date}
                              deleteTitle={"Delete your experience."}
                              deleteDescription={
                                "Are you sure to delete this experience. This action cannot be undone and it will completely remove this experience from your experience list."
                              }
                              deleteAction={() =>
                                deleteExperienceAction(exp.id)
                              }
                              hideTitle={"Hide your experience."}
                              hideDescription={
                                "Are you sure to hide this certificate. This action cannot be undone and it will completely hide this experience from your experience list."
                              }
                              hideAction={() => hideExperienceAction(exp.id)}
                              unhideTitle={"Unhide your experience."}
                              unhideDescription={
                                "Are you sure to unhide this experience. This action cannot be undone and it will completely add this experience to your experience list."
                              }
                              unhideAction={() =>
                                unhideExperienceAction(exp.id)
                              }
                              status={exp.visibility}
                            />
                          </AccordionContent>
                        ))}
                      </AccordionItem>
                    )}
                  </Accordion>
                )}
              </>
            )}
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
                  fieldLabel={"What was your role at the company?"}
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
                  required={true}
                />
                <CalendarField
                  fieldLabel={"End date"}
                  fieldName={"endDate"}
                  control={form.control}
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
    </>
  );
};
