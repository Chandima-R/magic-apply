"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/modules/shared/components/text-input";
import { TextArea } from "@/modules/shared/components/text-area";
import { CustomButton } from "@/modules/shared/components/custom-button";
import { useEffect, useState } from "react";
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
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";
import { CalendarField } from "@/modules/shared/components/calendar-field";
import { LoadingButton } from "@/modules/shared/components/loading-button";
import { usePathname } from "next/navigation";
import { ProfileActiveLinks } from "@/modules/shared/components/profile-active-links";
import { ActionCard } from "@/modules/shared/components/action-card";
import { CheckboxField } from "@/modules/shared/components/checkbox-input";
import { RequiredIndicator } from "@/modules/shared/components/required-indicator";

const experienceSchema = z
  .object({
    role: z.string().nonempty("Role is required."),
    company: z.string().nonempty("Company is required."),
    startDate: z.date({
      required_error: "Start date is required.",
    }),
    endDate: z
      .union([z.date().optional(), z.literal("").optional()])
      .refine((val) => val === "" || val instanceof Date, {
        message: "End date is required.",
      })
      .optional(),
    companyLocation: z.string().nonempty("Company Location is required."),
    jobDescription: z.string().nonempty("Job description is required."),
    isCurrent: z.boolean().default(false).optional(),
  })
  .refine((data) => !data.endDate || data.startDate < data.endDate, {
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
      endDate: "",
      companyLocation: "",
      jobDescription: "",
      isCurrent: false,
    },
  });

  const { watch, setValue } = form;
  const isCurrent = watch("isCurrent");

  useEffect(() => {
    if (isCurrent) {
      setValue("endDate", new Date());
    }
  }, [isCurrent, setValue]);

  const { data: experienceData, loading: experienceLoading } = useSubscription(
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

  const sortedExperience = visibleExperience?.sort((a: any, b: any) => {
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;
    return 0;
  });

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
            company_end_date: values.isCurrent
              ? ""
              : values.endDate
              ? new Date(values.endDate)
              : null,
            company_location: values.companyLocation,
            company_name: values.company,
            company_role: values.role,
            company_role_description: values.jobDescription,
            company_start_date: values.startDate,
            user_id: user?.id,
            isCurrent: isCurrent,
          },
        });

        toast({
          variant: "default",
          title: "Success.",
          description: "Your experience was added to your profile.",
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
        description: "Your experience was deleted from your profile.",
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
        description: "Your experience was hidden from your profile.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error hiding the experience.",
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
    <div className="p-4 border-[1px] shadow-md rounded">
      <ProfileActiveLinks activeLink={activeLink} />

      <p className={"text-sm space-x-1 mb-4"}>
        <RequiredIndicator />{" "}
        <span>
          This is required section for the resume, Please fill this section.
        </span>
      </p>

      <div className={"w-full flex flex-col lg:flex-row"}>
        <div className={"w-full lg:w-1/3"}>
          <div className={"rounded-sm overflow-hidden shadow mb-4"}>
            <video className={"w-full object-cover h-auto"} controls>
              <source src={"/video/resume-builder.mp4"} />
            </video>
          </div>
          <div>
            {experienceLoading ? (
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
                      {sortedExperience?.map((exp: any) => (
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
                              "Are you sure you want to delete this experience? This action is irreversible and will permanently remove it from your experiences list."
                            }
                            deleteAction={() => deleteExperienceAction(exp.id)}
                            hideTitle={"Hide this experience."}
                            hideDescription={
                              "Are you sure you want to hide this experience? This action is irreversible and will permanently hide the experience from your list and master resume"
                            }
                            hideAction={() => hideExperienceAction(exp.id)}
                            status={exp.visibility}
                            tab={"experience"}
                            isCurrent={isCurrent}
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
                                "Are you sure you want to delete this experience? This action is irreversible and will permanently remove it from your experiences list."
                              }
                              deleteAction={() =>
                                deleteExperienceAction(exp.id)
                              }
                              hideTitle={"Hide this experience."}
                              hideDescription={
                                "Are you sure you want to hide this experience? This action is irreversible and will permanently hide the experience from your list and master resume"
                              }
                              hideAction={() => hideExperienceAction(exp.id)}
                              unhideTitle={"Show this experience."}
                              unhideDescription={
                                "Are you sure to unhide this experience. This action cannot be undone and it will completely add this experience to your experience list."
                              }
                              unhideAction={() =>
                                unhideExperienceAction(exp.id)
                              }
                              status={exp.visibility}
                              isCurrent={isCurrent}
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
                <div className="flex flex-col gap-2">
                  <CalendarField
                    fieldLabel={"Start date"}
                    fieldName={"startDate"}
                    control={form.control}
                    required={true}
                  />
                  <CheckboxField
                    fieldLabel="Is this your current job?"
                    fieldName="isCurrent"
                    control={form.control}
                  />
                </div>
                {!isCurrent && (
                  <CalendarField
                    fieldLabel={"End date"}
                    fieldName={"endDate"}
                    control={form.control}
                    required={!isCurrent}
                  />
                )}
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
                    "Organized and implemented Google Analytics data tracking campaigns to maximize the effectiveness of email remarketing initiatives that were deployed using Salesforce’s marketing cloud software."
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
    </div>
  );
};
