"use client";

import { Form } from "@/components/ui/form";
import { TextInput } from "@/modules/shared/components/text-input";
import { TextArea } from "@/modules/shared/components/text-area";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import {
  ADD_NEW_EDUCATION_BY_USER_ID,
  DELETE_EDUCATION_BY_PK,
  EDUCATION_INFORMATION_BY_USER_ID,
  HIDE_EDUCATION_BY_PK,
} from "@/graphql/education";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ActionCard } from "@/modules/shared/components/action-card";
import { usePathname } from "next/navigation";
import { ProfileActiveLinks } from "../../../shared/components/profile-active-links";
import { CalendarField } from "@/modules/shared/components/calendar-field";
import { RequiredIndicator } from "@/modules/shared/components/required-indicator";
import { ProfileAlertDialog } from "@/modules/shared/components/profile-alert-dialog";
import { GET_USER_BY_CLERK_ID } from "@/graphql/user";
import { CheckboxField } from "@/modules/shared/components/checkbox-input";

const educationSchema = z
  .object({
    degree: z.string().nonempty("Degree or major required."),
    specialization: z.string().optional(),
    coursework: z.string().optional(),
    achievement: z
      .string()
      .max(50, "Achievement must be 50 characters or less.")
      .optional(),
    institute: z.string().nonempty("Institute is required."),
    instituteLocation: z
      .string()
      .nonempty("Location of the institute is required."),
    startDate: z.date({ required_error: "Start date is required." }),
    endDate: z.date({ required_error: "Completion date is required." }),
    gpa: z.string(),
    additionalInformation: z.string(),
    isCurrent: z.boolean().default(false).optional(),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "Start date must be before end date",
    path: ["endDate"],
  });

export const Education = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: "",
      specialization: "",
      coursework: "",
      achievement: "",
      institute: "",
      instituteLocation: "",
      startDate: new Date(),
      endDate: new Date(),
      gpa: "",
      additionalInformation: "",
      isCurrent: false,
    },
  });

  const { watch, setValue } = form;
  const isCurrent = watch("isCurrent");

  const degree = watch("degree");
  const institute = watch("institute");
  const institueLocation = watch("instituteLocation");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const isStartDateValid =
    startDate instanceof Date && !isNaN(startDate.getTime());

  const isEndDateValid = !isCurrent
    ? endDate instanceof Date && !isNaN(endDate.getTime())
    : true;

  const isDateRangeValid = !isCurrent || (endDate && startDate < endDate);

  const isValid =
    degree?.length > 0 &&
    institute?.length > 0 &&
    isStartDateValid &&
    isEndDateValid &&
    isDateRangeValid &&
    institueLocation?.length > 0;

  useEffect(() => {
    if (isCurrent) {
      setValue("endDate", new Date());
    }
  }, [isCurrent, setValue]);

  const { data: educationData, loading: educationLoading } = useSubscription(
    EDUCATION_INFORMATION_BY_USER_ID,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  const visibleEducation = educationData?.education?.filter(
    (exp: any) => exp.visibility === true
  );

  const sortedEducation = visibleEducation?.sort((a: any, b: any) => {
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;
    return 0;
  });

  const hiddenEducation = educationData?.education?.filter(
    (exp: any) => exp.visibility === false
  );

  const allEducation = educationData?.education?.map((e: any) => e);

  const hiddenEducationLength = allEducation?.length - visibleEducation?.length;

  const [addEducation] = useMutation(ADD_NEW_EDUCATION_BY_USER_ID);

  async function onSubmit(values: z.infer<typeof educationSchema>) {
    try {
      setIsLoading(true);
      if (!user?.id) {
        throw new Error("User is not authenticated");
      } else {
        await addEducation({
          variables: {
            user_id: user?.id,
            education_start_date: values.startDate,
            education_end_date: values.isCurrent
              ? ""
              : values.endDate
              ? new Date(values.endDate)
              : null,
            education_gpa: values.gpa,
            education_institute: values.institute,
            education_location: values.instituteLocation,
            education_major: values.degree,
            education_specialization: values.specialization,
            education_coursework: values.coursework,
            education_achievement: values.achievement,
            educatoin_additional_information: values.additionalInformation,
            isCurrent: isCurrent,
          },
        });

        toast({
          variant: "default",
          title: "Success.",
          description: "Your education was added to projects list.",
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

  const [deleteEducation] = useMutation(DELETE_EDUCATION_BY_PK);
  const deleteEducationAction = async (id: string) => {
    try {
      await deleteEducation({
        variables: {
          id,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your education was deleted from the education list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error deleting the education.",
      });
    }
  };

  const [hideEducation] = useMutation(HIDE_EDUCATION_BY_PK);
  const hideEducationAction = async (id: string) => {
    try {
      await hideEducation({
        variables: {
          id,
          visibility: false,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your education was hide from the education list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error deleting the education.",
      });
    }
  };

  const unhideEducationAction = async (id: string) => {
    try {
      await hideEducation({
        variables: {
          id,
          visibility: true,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your education was added to the education list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error adding education.",
      });
    }
  };

  const path = usePathname();
  const activeLink = path.split("/")[2];

  const { data: userData, loading: userLoading } = useSubscription(
    GET_USER_BY_CLERK_ID,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

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
            {educationLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {educationData?.education?.length > 0 && (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="education"
                  >
                    <AccordionItem value="education">
                      <AccordionTrigger className="text-xl font-semibold capitalize">
                        your education
                      </AccordionTrigger>
                      {hiddenEducationLength ? (
                        <span>
                          You have {hiddenEducationLength} hidden education(s)
                          in your bucket.
                        </span>
                      ) : (
                        ""
                      )}
                      {sortedEducation?.map((education: any) => (
                        <AccordionContent key={education.id}>
                          <ActionCard
                            id={education.id}
                            company={education.education_institute}
                            role={education.education_major}
                            country={education?.education_location}
                            fromDate={education.education_start_date}
                            toDate={education.education_end_date}
                            deleteTitle={"Delete your education."}
                            deleteDescription={
                              "Are you sure you want to delete this education? This action is irreversible and will permanently remove it from your education list."
                            }
                            deleteAction={() =>
                              deleteEducationAction(education.id)
                            }
                            hideTitle={"Hide this education."}
                            hideDescription={
                              "Are you sure you want to hide this education? This action is irreversible and will permanently hide the education from your list and master resume."
                            }
                            hideAction={() => hideEducationAction(education.id)}
                            status={education.visibility}
                            tab="education"
                            isCurrent={isCurrent}
                          />
                        </AccordionContent>
                      ))}
                    </AccordionItem>

                    {hiddenEducationLength > 0 && (
                      <AccordionItem value="hidden-education">
                        <AccordionTrigger className="text-xl font-semibold capitalize flex justify-between gap-2">
                          <div>
                            hidden education{" "}
                            <span
                              className={
                                "text-sm lowercase text-slate-600 font-normal"
                              }
                            >
                              ({hiddenEducationLength} hidden education(s))
                            </span>
                          </div>
                        </AccordionTrigger>
                        {hiddenEducation?.map((education: any) => (
                          <AccordionContent key={education.id}>
                            <ActionCard
                              id={education.id}
                              company={education.education_institute}
                              role={education.education_major}
                              country={education?.education_location}
                              fromDate={education.education_start_date}
                              toDate={education.education_end_date}
                              deleteTitle={"Delete your education."}
                              deleteDescription={
                                "Are you sure you want to delete this education? This action is irreversible and will permanently remove it from your educations list."
                              }
                              deleteAction={() =>
                                deleteEducationAction(education.id)
                              }
                              hideTitle={"Hide this education."}
                              hideDescription={
                                "Are you sure you want to hide this education? This action is irreversible and will permanently hide the education from your list and master resume"
                              }
                              hideAction={() =>
                                hideEducationAction(education.id)
                              }
                              unhideTitle={"Show this education."}
                              unhideDescription={
                                "Are you sure you want to unhide this experience? This action is irreversible and will permanently add the experience from your list and master resume."
                              }
                              unhideAction={() =>
                                unhideEducationAction(education.id)
                              }
                              status={education.visibility}
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
        <div className={"w-full lg:w-2/3 px-2 lg:px-6 py-4 lg:py-0"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className={"gap-4 lg:gap-8 grid grid-cols-1 w-full"}>
                <TextInput
                  fieldLabel={
                    "What is your degree or other qualification and major?"
                  }
                  fieldName={"degree"}
                  control={form.control}
                  placeholder={"Bachelor of Science in Economics"}
                  required={true}
                />
                <TextInput
                  fieldLabel={"What is your specialization?"}
                  fieldName={"specialization"}
                  control={form.control}
                  placeholder={"Financial Economics"}
                  required={false}
                />
                <TextArea
                  fieldLabel={
                    "What subjects or modules did you study in your degree program?"
                  }
                  fieldName={"coursework"}
                  control={form.control}
                  placeholder={
                    "Macroeconomics, International trade, Money and banking..."
                  }
                  required={false}
                  description="Seperate modules using a comma(,)."
                />
                <TextInput
                  fieldLabel={"Where did you earn your degree / qualification?"}
                  fieldName={"institute"}
                  control={form.control}
                  placeholder={"University of Wisconsin, Madison"}
                  required={true}
                />
                <TextInput
                  fieldLabel={"Where is the institute located?"}
                  fieldName={"instituteLocation"}
                  control={form.control}
                  placeholder={"Madison, WI"}
                  required={true}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <CalendarField
                      fieldLabel={
                        "When did you start your degree/ qualification?"
                      }
                      fieldName={"startDate"}
                      control={form.control}
                      required={true}
                    />
                    <CheckboxField
                      fieldLabel="Is this your current education?"
                      fieldName="isCurrent"
                      control={form.control}
                      required={!isCurrent}
                    />
                  </div>

                  {!isCurrent && (
                    <>
                      <CalendarField
                        fieldLabel={
                          "When did you earn your degree/ qualification?"
                        }
                        fieldName={"endDate"}
                        control={form.control}
                        required={true}
                      />
                    </>
                  )}
                </div>

                <TextInput
                  fieldLabel={"GPA (If applicable)"}
                  fieldName={"gpa"}
                  control={form.control}
                  placeholder={"3.28"}
                  required={false}
                />
                <TextInput
                  fieldLabel={"What are your achievements?"}
                  fieldName={"achievement"}
                  control={form.control}
                  placeholder={"Deans list"}
                  required={false}
                />
                <TextArea
                  fieldLabel={"Additional information"}
                  fieldName={"additionalInformation"}
                  control={form.control}
                  placeholder={
                    "Awarded full scholarship for 4 years due to grades."
                  }
                  required={false}
                />
              </div>

              <div className="flex justify-end w-full mt-8">
                <div className="w-38">
                  <ProfileAlertDialog
                    sectionName={"Education"}
                    planName={userData?.user[0]?.user_plan}
                    usedSlots={parseInt(educationData?.education.length)}
                    disabled={!isValid}
                    onConfirm={() => form.handleSubmit(onSubmit)()}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
