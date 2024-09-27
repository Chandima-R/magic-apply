"use client";

import { Form } from "@/components/ui/form";
import { TextInput } from "@/modules/shared/components/text-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton } from "@/modules/shared/components/custom-button";
import { LoadingButton } from "@/modules/shared/components/loading-button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import {
  ADD_NEW_COURSEWORK_BY_USER_ID,
  COURSEWORK_INFORMATION_BY_USER_ID,
  DELETE_COURSEWORK_BY_PK,
  HIDE_COURSEWORK_BY_PK,
} from "@/graphql/coursework";
import { useMutation, useSubscription } from "@apollo/client";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ActionCard } from "@/modules/shared/components/action-card";
import { usePathname } from "next/navigation";
import { ProfileActiveLinks } from "@/modules/shared/components/profile-active-links";
import { SelectInput } from "@/modules/shared/components/select-input";
import { EDUCATION_INFORMATION_BY_USER_ID } from "@/graphql/education";
import { CheckboxField } from "@/modules/shared/components/checkbox-input";

const courseworkSchema = z.object({
  courseName: z.string().nonempty("Course name is required."),
  courseInstitute: z.string().nonempty("Course issued institute is required."),
  courseCompletionDate: z.string().nonempty("Course issued date is required."),
  isExistingEducation: z.boolean().default(false).optional(),
});

export const Coursework = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof courseworkSchema>>({
    resolver: zodResolver(courseworkSchema),
    defaultValues: {
      courseName: "",
      courseInstitute: "",
      courseCompletionDate: "",
      isExistingEducation: false,
    },
  });

  const { data: courserworkData, loading: courseworkLoading } = useSubscription(
    COURSEWORK_INFORMATION_BY_USER_ID,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  const visibleCoursework = courserworkData?.coursework?.filter(
    (course: any) => course.visibility === true
  );

  const hiddenCoursework = courserworkData?.coursework?.filter(
    (course: any) => course.visibility === false
  );

  const allCoursework = courserworkData?.coursework?.map(
    (course: any) => course
  );

  const hiddenCourseworkLength =
    allCoursework?.length - visibleCoursework?.length;

  const [addCoursework] = useMutation(ADD_NEW_COURSEWORK_BY_USER_ID);
  async function onSubmit(values: z.infer<typeof courseworkSchema>) {
    try {
      setIsLoading(true);
      if (!user?.id) {
        throw new Error("User is not authenticated");
      } else {
        await addCoursework({
          variables: {
            course_completion_year: values.courseCompletionDate,
            course_institute: values.courseInstitute,
            course_name: values.courseName,
            user_id: user?.id,
            isExistingEducation: values.isExistingEducation,
          },
        });

        toast({
          variant: "default",
          title: "Success.",
          description: "Your coursework was added to coursework list.",
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

  const [deleteCoursework] = useMutation(DELETE_COURSEWORK_BY_PK);
  const deleteCourseworkAction = async (id: string) => {
    try {
      await deleteCoursework({
        variables: {
          id,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your coursework was deleted from the coursework list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error deleting the coursework.",
      });
    }
  };

  const [hideCoursework] = useMutation(HIDE_COURSEWORK_BY_PK);
  const hideCourseworkAction = async (id: string) => {
    try {
      await hideCoursework({
        variables: {
          id,
          visibility: false,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your coursework was hidden from the coursework list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error hiding the coursework.",
      });
    }
  };

  const unhideCourseworkAction = async (id: string) => {
    try {
      await hideCoursework({
        variables: {
          id,
          visibility: true,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your coursework was added to the coursework list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error adding the coursework.",
      });
    }
  };

  const path = usePathname();
  const activeLink = path.split("/")[2];

  const { data: educationData } = useSubscription(
    EDUCATION_INFORMATION_BY_USER_ID,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  return (
    <div className="p-4 border-[1px] shadow-md rounded">
      <ProfileActiveLinks activeLink={activeLink} />
      <div className={"w-full flex flex-col lg:flex-row"}>
        <div className={"w-full lg:w-1/3"}>
          <div className={"rounded-sm overflow-hidden shadow mb-4"}>
            <video className={"w-full object-cover h-auto"} controls>
              <source src={"/video/resume-builder.mp4"} />
            </video>
          </div>
          <div>
            {courseworkLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {courserworkData?.coursework?.length > 0 && (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="coursework"
                  >
                    <AccordionItem value="coursework">
                      <AccordionTrigger className="text-xl font-semibold capitalize">
                        your coursework
                      </AccordionTrigger>

                      {visibleCoursework?.map((coursework: any) => (
                        <AccordionContent key={coursework.id}>
                          <ActionCard
                            id={coursework.id}
                            company={coursework.course_institute}
                            role={coursework.course_name}
                            country={""}
                            fromDate={""}
                            toDate={coursework.course_completion_year}
                            deleteTitle={"Delete your coursework."}
                            deleteDescription={
                              "Are you sure you want to delete this coursework? This action is irreversible and will permanently remove it from your coursework list."
                            }
                            deleteAction={() =>
                              deleteCourseworkAction(coursework.id)
                            }
                            hideTitle={"Hide this coursework."}
                            hideDescription={
                              "Are you sure you want to hide this coursework? This action is irreversible and will permanently hide the coursework from your list and master resume."
                            }
                            hideAction={() =>
                              hideCourseworkAction(coursework.id)
                            }
                            status={coursework.visibility}
                            tab={"coursework"}
                          />
                        </AccordionContent>
                      ))}
                    </AccordionItem>

                    {hiddenCourseworkLength > 0 && (
                      <AccordionItem value="hidden-coursework">
                        <AccordionTrigger className="text-xl font-semibold capitalize flex justify-between gap-2">
                          <div>
                            hidden coursework{" "}
                            <span
                              className={
                                "text-sm lowercase text-slate-600 font-normal"
                              }
                            >
                              ({hiddenCourseworkLength} hidden coursework(s))
                            </span>
                          </div>
                        </AccordionTrigger>
                        {hiddenCoursework?.map((coursework: any) => (
                          <AccordionContent key={coursework.id}>
                            <ActionCard
                              id={coursework.id}
                              company={coursework.course_institute}
                              role={coursework.course_name}
                              country={""}
                              fromDate={""}
                              toDate={coursework.course_completion_year}
                              deleteTitle={"Delete your coursework."}
                              deleteDescription={
                                "Are you sure you want to delete this coursework? This action is irreversible and will permanently remove it from your coursework list."
                              }
                              deleteAction={() =>
                                deleteCourseworkAction(coursework.id)
                              }
                              hideTitle={"Hide this coursework."}
                              hideDescription={
                                "Are you sure you want to hide this coursework? This action is irreversible and will permanently hide the coursework from your list and master resume."
                              }
                              hideAction={() =>
                                hideCourseworkAction(coursework.id)
                              }
                              unhideTitle={"Show this coursework."}
                              unhideDescription={
                                "Are you sure you want to unhide this coursework? This action is irreversible and will permanently add the coursework from your list and master resume."
                              }
                              unhideAction={() =>
                                unhideCourseworkAction(coursework.id)
                              }
                              status={coursework.visibility}
                              tab={"hidden-coursework"}
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
        <div className={"w-full lg:w-2/3 lg:ml-4"}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <TextInput
                fieldName={"courseName"}
                fieldLabel={"What was the course name?"}
                placeholder={"Introduction to Engineering Design"}
                control={form.control}
                required={true}
              />
              <CheckboxField
                fieldName={"isExistingEducation"}
                fieldLabel={"Use your existing educational institution?"}
                control={form.control}
              />
              {form.watch("isExistingEducation") ? (
                <SelectInput
                  fieldName={"courseInstitute"}
                  fieldLabel={"Select Institute"}
                  placeholder={"Select your institution"}
                  control={form.control}
                  options={
                    educationData?.education?.map((education: any) => ({
                      label: education.education_institute,
                      value: education.education_institute,
                    })) || []
                  }
                  required={true}
                />
              ) : (
                <TextInput
                  fieldName={"courseInstitute"}
                  fieldLabel={"Where did you take the course?"}
                  placeholder={"Massachusetts Institute of Technology"}
                  control={form.control}
                  required={true}
                />
              )}
              <TextInput
                fieldName={"courseCompletionDate"}
                fieldLabel={"When did you take the course?"}
                placeholder={"2024"}
                control={form.control}
                required={true}
              />
              <div className="flex justify-end w-full mt-8">
                <div className="w-38">
                  {isLoading ? (
                    <LoadingButton />
                  ) : (
                    <>
                      {courserworkData?.coursework?.length >= 5 ? (
                        <CustomButton
                          disabled
                          type="submit"
                          title="Save to coursework list"
                        />
                      ) : (
                        <CustomButton
                          type="submit"
                          title="Save to coursework list"
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
