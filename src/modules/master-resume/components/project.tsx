"use client";

import { Form } from "@/components/ui/form";
import { TextInput } from "@/modules/shared/components/text-input";
import { TextArea } from "@/modules/shared/components/text-area";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton } from "@/modules/shared/components/custom-button";
import { CalendarField } from "@/modules/shared/components/calendar-field";
import { useMutation, useSubscription } from "@apollo/client";
import { useToast } from "@/components/ui/use-toast";
import { CONTACT_INFORMATION } from "@/graphql/contact";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import {
  DELETE_PROJECT_BY_PK,
  PROJECT_INFORMATION_BY_USER_ID,
  HIDE_PROJECT_BY_PK,
  ADD_NEW_PROJECT_BY_USER_ID,
} from "@/graphql/project";
import { LoadingButton } from "@/modules/shared/components/loading-button";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ActionCard } from "@/modules/shared/components/action-card";
import { usePathname } from "next/navigation";
import { MasterResumeActiveLink } from "./master-resume-active-link";

const projectSchema = z.object({
  projectTitle: z.string().nonempty("Project title is required."),
  organization: z.string().nonempty("Organization is required."),
  projectStartDate: z.date({
    required_error: "Start date is required.",
  }),
  projectEndDate: z.date({
    required_error: "end date is required.",
  }),
  projectUrl: z.string(),
  projectDescription: z.string().nonempty("Job description is required."),
});
export const Project = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectTitle: "",
      organization: "",
      projectStartDate: new Date(),
      projectEndDate: new Date(),
      projectUrl: "",
      projectDescription: "",
    },
  });

  const { data: projectData, loading: projectLoading } = useSubscription(
    PROJECT_INFORMATION_BY_USER_ID,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  const visibleProjects = projectData?.project?.filter(
    (exp: any) => exp.visibility === true
  );

  const allProjects = projectData?.project?.map((e: any) => e);

  const hiddenProjects = allProjects?.length - visibleProjects?.length;

  const [addProject] = useMutation(ADD_NEW_PROJECT_BY_USER_ID);
  async function onSubmit(values: z.infer<typeof projectSchema>) {
    try {
      setIsLoading(true);
      if (!user?.id) {
        throw new Error("User is not authenticated");
      } else {
        await addProject({
          variables: {
            user_id: user?.id,
            project_url: values.projectUrl,
            project_start_date: values.projectStartDate,
            project_end_date: values.projectEndDate,
            project_name: values.projectTitle,
            project_role: values.projectDescription,
            project_organization: values.organization,
            project_role_description: values.projectDescription,
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

  const [deleteProject] = useMutation(DELETE_PROJECT_BY_PK);
  const deleteProjectAction = async (id: string) => {
    try {
      await deleteProject({
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

  const [hideProject] = useMutation(HIDE_PROJECT_BY_PK);
  const hideProjectAction = async (id: string) => {
    try {
      await hideProject({
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

  const path = usePathname();
  const activeLink = path.split("/")[2];

  return (
    <>
      <MasterResumeActiveLink activeLink={activeLink} />
      <div className={"w-full flex flex-col lg:flex-row"}>
        <div className={"w-full lg:w-1/3"}>
          <div className={"rounded-sm overflow-hidden shadow mb-4"}>
            <video className={"w-full object-cover h-auto"} controls>
              <source src={"/video/resume-builder.mp4"} />
            </video>
          </div>
          <div>
            {projectLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {projectData?.project?.length > 0 && (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="project"
                  >
                    <AccordionItem value="project">
                      <AccordionTrigger className="text-xl font-semibold capitalize">
                        your projects
                      </AccordionTrigger>
                      {hiddenProjects ? (
                        <span>
                          You have {hiddenProjects} hidden project(s) in your
                          bucket.
                        </span>
                      ) : (
                        ""
                      )}
                      {visibleProjects?.map((poject: any) => (
                        <AccordionContent key={poject.id}>
                          <ActionCard
                            id={poject.id}
                            company={poject.project_organization}
                            role={poject.project_name}
                            country={""}
                            fromDate={poject.project_start_date}
                            toDate={poject.project_end_date}
                            deleteTitle={"Delete your project."}
                            deleteDescription={
                              "Are you sure to delete this project. This action cannot be undone and it will completely remove this project from your projects."
                            }
                            deleteAction={() => deleteProjectAction(poject.id)}
                            hideTitle={"Hide your project."}
                            hideDescription={
                              "Are you sure to hide this project. This action cannot be undone and it will completely hide this project from your projects."
                            }
                            hideAction={() => hideProjectAction(poject.id)}
                          />
                        </AccordionContent>
                      ))}
                    </AccordionItem>
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
                  fieldLabel={"Give your project a title"}
                  fieldName={"projectTitle"}
                  control={form.control}
                  placeholder={"Volunteer"}
                  required={true}
                />
                <TextInput
                  fieldLabel={"In which organization did you do your project?"}
                  fieldName={"organization"}
                  control={form.control}
                  placeholder={"Habitat for Humanity"}
                  required={true}
                />
                <CalendarField
                  fieldLabel={"Start date"}
                  fieldName={"projectStartDate"}
                  control={form.control}
                  placeholder={"city"}
                  required={true}
                />
                <CalendarField
                  fieldLabel={"End date"}
                  fieldName={"projectEndDate"}
                  control={form.control}
                  placeholder={"city"}
                  required={true}
                />
                <TextInput
                  fieldLabel={"Project URL"}
                  fieldName={"projectUrl"}
                  control={form.control}
                  placeholder={"New York, NY"}
                  required={false}
                />
              </div>
              <div className={"mt-4 lg:mt-8 "}>
                <TextArea
                  fieldLabel={"Now describe what you did"}
                  fieldName={"projectDescription"}
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
                      {projectData?.project?.length >= 5 ? (
                        <CustomButton
                          disabled
                          type="submit"
                          title="Save to roject list"
                        />
                      ) : (
                        <CustomButton
                          type="submit"
                          title="Save to project list"
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
