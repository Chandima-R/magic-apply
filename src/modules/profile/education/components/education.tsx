"use client";

import { Form } from "@/components/ui/form";
import { TextInput } from "@/modules/shared/components/text-input";
import { TextArea } from "@/modules/shared/components/text-area";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton } from "@/modules/shared/components/custom-button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
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
import { LoadingButton } from "@/modules/shared/components/loading-button";
import { usePathname } from "next/navigation";
import { ProfileActiveLinks } from "../../../shared/components/profile-active-links";

const educationSchema = z.object({
  degree: z.string().nonempty("Degree or major required."),
  institute: z.string().nonempty("Institute is required."),
  instituteLocation: z
    .string()
    .nonempty("Location of the institute is required."),
  completionDate: z.string().nonempty("Completion date is required."),
  minorDegree: z.string().nonempty("Any minor is required."),
  gpa: z.string(),
  additionalInformation: z.string(),
});
export const Education = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: "",
      institute: "",
      instituteLocation: "",
      completionDate: "",
      minorDegree: "",
      gpa: "",
      additionalInformation: "",
    },
  });

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
            education_completion_year: values.completionDate,
            education_gpa: values.gpa,
            education_institute: values.institute,
            education_location: values.instituteLocation,
            education_major: values.degree,
            education_minor: values.minorDegree,
            educatoin_additional_information: values.additionalInformation,
          },
        });

        toast({
          variant: "default",
          title: "Success.",
          description: "Your education was added to project list.",
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
                      {visibleEducation?.map((education: any) => (
                        <AccordionContent key={education.id}>
                          <ActionCard
                            id={education.id}
                            company={education.education_institute}
                            role={education.education_major}
                            country={""}
                            fromDate={""}
                            toDate={education.education_completion_year}
                            deleteTitle={"Delete your education."}
                            deleteDescription={
                              "Are you sure to delete this education. This action cannot be undone and it will completely remove this education from your educations."
                            }
                            deleteAction={() =>
                              deleteEducationAction(education.id)
                            }
                            hideTitle={"Hide your education."}
                            hideDescription={
                              "Are you sure to hide this education. This action cannot be undone and it will completely hide this education from your educations."
                            }
                            hideAction={() => hideEducationAction(education.id)}
                            status={education.visibility}
                            tab="education"
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
                              country={""}
                              fromDate={""}
                              toDate={education.education_completion_year}
                              deleteTitle={"Delete your education."}
                              deleteDescription={
                                "Are you sure to delete this education. This action cannot be undone and it will completely remove this education from your educations."
                              }
                              deleteAction={() =>
                                deleteEducationAction(education.id)
                              }
                              hideTitle={"Hide your education."}
                              hideDescription={
                                "Are you sure to hide this education. This action cannot be undone and it will completely hide this education from your educations."
                              }
                              hideAction={() =>
                                hideEducationAction(education.id)
                              }
                              unhideTitle={"Unhide your education."}
                              unhideDescription={
                                "Are you sure to unhide this education. This action cannot be undone and it will completely add this education to your educations list."
                              }
                              unhideAction={() =>
                                unhideEducationAction(education.id)
                              }
                              status={education.visibility}
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
                <TextInput
                  fieldLabel={"When did you earn our degree/ qualification?"}
                  fieldName={"completionDate"}
                  control={form.control}
                  placeholder={"2024"}
                  required={true}
                />
                <TextInput
                  fieldLabel={"Di you minor in anything?"}
                  fieldName={"minorDegree"}
                  control={form.control}
                  placeholder={"Did you minor in anything?"}
                  required={true}
                />
                <TextInput
                  fieldLabel={"GPA (If applicable)"}
                  fieldName={"gpa"}
                  control={form.control}
                  placeholder={"3.28"}
                  required={false}
                />
                <TextArea
                  fieldLabel={"Open field for additional information"}
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
                  {isLoading ? (
                    <LoadingButton />
                  ) : (
                    <>
                      {educationData?.education?.length >= 5 ? (
                        <CustomButton
                          disabled
                          type="submit"
                          title="Save to education list"
                        />
                      ) : (
                        <CustomButton
                          type="submit"
                          title="Save to education list"
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
