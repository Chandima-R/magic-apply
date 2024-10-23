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
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  ADD_NEW_PROJECT_BY_USER_ID,
  DELETE_PROJECT_BY_PK,
  HIDE_PROJECT_BY_PK,
  PROJECT_INFORMATION_BY_USER_ID,
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
import { ProfileActiveLinks } from "@/modules/shared/components/profile-active-links";
import { RequiredIndicator } from "@/modules/shared/components/required-indicator";
import { CheckboxField } from "@/modules/shared/components/checkbox-input";
import { ProfileAlertDialog } from "@/modules/shared/components/profile-alert-dialog";
import { GET_USER_BY_CLERK_ID } from "@/graphql/user";

const projectSchema = z
  .object({
    projectTitle: z.string().nonempty("Project title is required."),
    organization: z.string().nonempty("Organization is required."),
    organizationLocation: z
      .string()
      .nonempty("Organization location is required."),
    projectStartDate: z.date({
      required_error: "Start date is required.",
    }),
    projectEndDate: z.date({
      required_error: "End date is required.",
    }),
    projectUrl: z.string().optional(),
    projectDescription: z.string().nonempty("Project description is required."),
    isCurrent: z.boolean().default(false).optional(),
  })
  .refine((data) => data.projectStartDate < data.projectEndDate, {
    message: "Start date must be before end date",
    path: ["projectEndDate"],
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
      organizationLocation: "",
      projectStartDate: new Date(),
      projectEndDate: new Date(),
      projectUrl: "",
      projectDescription: "",
      isCurrent: false,
    },
  });

  const { watch, setValue } = form;
  const isCurrent = watch("isCurrent");

  const projectTitle = watch("projectTitle");
  const organization = watch("organization");
  const organizationLocation = watch("organizationLocation");
  const projectStartDate = watch("projectStartDate");
  const projectEndDate = watch("projectEndDate");

  const isStartDateValid =
    projectStartDate instanceof Date && !isNaN(projectStartDate.getTime());

  const isEndDateValid = !isCurrent
    ? projectEndDate instanceof Date && !isNaN(projectEndDate.getTime())
    : true;

  const isDateRangeValid =
    !isCurrent || (projectEndDate && projectStartDate < projectEndDate);

  const isValid =
    projectTitle?.length > 0 &&
    organization?.length > 0 &&
    isStartDateValid &&
    isEndDateValid &&
    isDateRangeValid &&
    organizationLocation?.length > 0;

  useEffect(() => {
    if (isCurrent) {
      setValue("projectEndDate", new Date());
    }
  }, [isCurrent, setValue]);

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

  const sortedProjects = visibleProjects?.sort((a: any, b: any) => {
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;
    return 0;
  });

  console.log(projectData);

  const hiddenProjects = projectData?.project?.filter(
    (exp: any) => exp.visibility === false
  );

  const allProjects = projectData?.project?.map((e: any) => e);

  const hiddenProjectsLength = allProjects?.length - visibleProjects?.length;

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
            project_end_date: values.isCurrent
              ? ""
              : values.projectEndDate
              ? new Date(values.projectEndDate)
              : null,
            project_name: values.projectTitle,
            project_role: values.projectDescription,
            project_organization: values.organization,
            project_location: values.organizationLocation,
            project_role_description: values.projectDescription,
            isCurrent: isCurrent,
          },
        });

        toast({
          variant: "default",
          title: "Success.",
          description: "Your project was added to the project list.",
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
        description: "There was an error deleting the project.",
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
        description: "Your project was hidden from the project list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error hiding the project.",
      });
    }
  };

  const unhideProjectAction = async (id: string) => {
    try {
      await hideProject({
        variables: {
          id,
          visibility: true,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your project was added to the project list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error adding the project.",
      });
    }
  };

  const path = usePathname();
  const activeLink = path.split("/")[2];

  const startDate = form.watch("projectStartDate");
  const endDate = form.watch("projectEndDate");

  const { data: userData, loading: userLoading } = useSubscription(
    GET_USER_BY_CLERK_ID,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  useEffect(() => {
    if (startDate && endDate && startDate >= endDate) {
      form.setError("projectEndDate", {
        type: "manual",
        message: "End date must be after start date",
      });
    } else {
      form.clearErrors("projectEndDate");
    }
  }, [startDate, endDate, form]);

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
                        Your projects
                      </AccordionTrigger>
                      {hiddenProjectsLength ? (
                        <span>
                          You have {hiddenProjectsLength} hidden project(s) in
                          your bucket.
                        </span>
                      ) : (
                        ""
                      )}
                      {sortedProjects?.map((project: any) => (
                        <AccordionContent key={project.id}>
                          <ActionCard
                            id={project.id}
                            company={project.project_organization}
                            role={project.project_name}
                            country={project.project_location}
                            fromDate={project.project_start_date}
                            toDate={project.project_end_date}
                            deleteTitle={"Delete your project."}
                            deleteDescription={
                              "Are you sure you want to delete this project? This action is irreversible and will permanently remove it from your projects list."
                            }
                            deleteAction={() => deleteProjectAction(project.id)}
                            hideTitle={"Hide this project."}
                            hideDescription={
                              "Are you sure you want to hide this project? This action is irreversible and will permanently hide the project from your list and master resume."
                            }
                            hideAction={() => hideProjectAction(project.id)}
                            status={project.visibility}
                            tab="projects"
                            isCurrent={isCurrent}
                          />
                        </AccordionContent>
                      ))}
                    </AccordionItem>

                    {hiddenProjectsLength > 0 && (
                      <AccordionItem value="project">
                        <AccordionTrigger className="text-xl font-semibold capitalize">
                          <div>
                            Hidden projects{" "}
                            <span
                              className={
                                "text-sm lowercase text-slate-600 font-normal"
                              }
                            >
                              ({hiddenProjectsLength} hidden project(s))
                            </span>
                          </div>
                        </AccordionTrigger>
                        {hiddenProjects?.map((project: any) => (
                          <AccordionContent key={project.id}>
                            <ActionCard
                              id={project.id}
                              company={project.project_organization}
                              role={project.project_name}
                              country={project.project_location}
                              fromDate={project.project_start_date}
                              toDate={project.project_end_date}
                              deleteTitle={"Delete your project."}
                              deleteDescription={
                                "Are you sure you want to delete this project? This action is irreversible and will permanently remove it from your projects list."
                              }
                              deleteAction={() =>
                                deleteProjectAction(project.id)
                              }
                              hideTitle={"Hide this project."}
                              hideDescription={
                                "Are you sure you want to hide this project? This action is irreversible and will permanently hide the project from your list and master resume."
                              }
                              hideAction={() => hideProjectAction(project.id)}
                              unhideTitle={"Show this project."}
                              unhideDescription={
                                "Are you sure you want to unhide this project? This action is irreversible and will permanently add the project from your list and master resume."
                              }
                              unhideAction={() =>
                                unhideProjectAction(project.id)
                              }
                              status={project.visibility}
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
                <TextInput
                  fieldLabel={"Where is the organization located?"}
                  fieldName={"organizationLocation"}
                  control={form.control}
                  placeholder={"New York, NY"}
                  required={true}
                />

                <div className="flex flex-col gap-2">
                  <CalendarField
                    fieldLabel={"Start date"}
                    fieldName={"projectStartDate"}
                    control={form.control}
                    required={true}
                  />

                  <CheckboxField
                    fieldLabel="Is this your ongoing project?"
                    fieldName="isCurrent"
                    control={form.control}
                    required={!isCurrent}
                  />
                </div>

                {!isCurrent && (
                  <>
                    <CalendarField
                      fieldLabel={"End date"}
                      fieldName={"projectEndDate"}
                      control={form.control}
                      required={true}
                    />
                  </>
                )}

                <TextInput
                  fieldLabel={"Project URL"}
                  fieldName={"projectUrl"}
                  control={form.control}
                  placeholder={"https://www.myproject.com"}
                  required={false}
                />
              </div>

              <div className={"mt-4 lg:mt-8 "}>
                <TextArea
                  fieldLabel={"Now describe what you did"}
                  fieldName={"projectDescription"}
                  control={form.control}
                  placeholder={
                    "Organized and implemented Google Analytics data tracking campaigns to maximize the effectiveness of email remarketing initiatives that were deployed using Salesforce&rsquo;s marketing cloud software. "
                  }
                  required={true}
                />
              </div>

              <div className="flex justify-end w-full mt-8">
                <div className="w-38">
                  <ProfileAlertDialog
                    sectionName={"Projects"}
                    planName={userData?.user[0]?.user_plan}
                    usedSlots={parseInt(projectData?.project.length)}
                    disabled={!isValidfeat}
                    onConfirm={() => form.handleSubmit(onSubmit)()}
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
