"use client";

import { Form } from "@/components/ui/form";
import { TextInput } from "@/modules/shared/components/text-input";
import { TextArea } from "@/modules/shared/components/text-area";
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
import { ProfileActiveLinks } from "@/modules/master-resume/components/profile-active-links";

const courseworkSchema = z.object({
  courseName: z.string().nonempty("Course name is required."),
  courseInstitute: z.string().nonempty("Course issued institute is required."),
  courseCompletionDate: z.string().nonempty("Course issued date is required."),
  courseSkill: z.string(),
  courseDescription: z.string(),
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
      courseSkill: "",
      courseDescription: "",
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
            course_skill: values.courseSkill,
            course_skill_description: values.courseDescription,
            user_id: user?.id,
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

  const [hdieCoursework] = useMutation(HIDE_COURSEWORK_BY_PK);
  const hideCourseworkAction = async (id: string) => {
    try {
      await hdieCoursework({
        variables: {
          id,
          visibility: false,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your coursework was hide from the coursework list.",
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
      await hdieCoursework({
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
                              "Are you sure to delete this coursework. This action cannot be undone and it will completely remove this coursework from your coursework."
                            }
                            deleteAction={() =>
                              deleteCourseworkAction(coursework.id)
                            }
                            hideTitle={"Hide your coursework."}
                            hideDescription={
                              "Are you sure to hide this coursework. This action cannot be undone and it will completely hide this coursework from your coursework."
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
                                "Are you sure to delete this coursework. This action cannot be undone and it will completely remove this coursework from your coursework."
                              }
                              deleteAction={() =>
                                deleteCourseworkAction(coursework.id)
                              }
                              hideTitle={"Hide your coursework."}
                              hideDescription={
                                "Are you sure to hide this coursework. This action cannot be undone and it will completely hide this coursework from your coursework."
                              }
                              hideAction={() =>
                                hideCourseworkAction(coursework.id)
                              }
                              unhideTitle={"Unhide your coursework."}
                              unhideDescription={
                                "Are you sure to unhide this coursework. This action cannot be undone and it will completely add this coursework to your coursework list."
                              }
                              unhideAction={() =>
                                unhideCourseworkAction(coursework.id)
                              }
                              status={coursework.visibility}
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
                  fieldLabel={"What was the course name?"}
                  fieldName={"courseName"}
                  control={form.control}
                  placeholder={"Introduction to Computer Science"}
                  required={true}
                />
                <TextInput
                  fieldLabel={"Where did you take the course?"}
                  fieldName={"courseInstitute"}
                  control={form.control}
                  placeholder={"University of Wisconsin, Madison"}
                  required={true}
                />
                <TextInput
                  fieldLabel={"When did you take the course?"}
                  fieldName={"courseCompletionDate"}
                  control={form.control}
                  placeholder={"2024"}
                  required={true}
                />
                <TextInput
                  fieldLabel={"When skill did you use?"}
                  fieldName={"courseSkill"}
                  control={form.control}
                  placeholder={"Teamwork"}
                  required={false}
                />
                <TextArea
                  fieldLabel={"How was that skill applied?"}
                  fieldName={"courseDescription"}
                  control={form.control}
                  placeholder={
                    "Coordinating on code with a small group of people."
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
    </>
  );
};