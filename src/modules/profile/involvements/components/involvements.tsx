"use client";

import { Form } from "@/components/ui/form";
import { TextInput } from "@/modules/shared/components/text-input";
import { TextArea } from "@/modules/shared/components/text-area";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton } from "@/modules/shared/components/custom-button";
import { CalendarField } from "@/modules/shared/components/calendar-field";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import {
  ADD_NEW_INVOLVEMENT_BY_USER_ID,
  DELETE_INVOLVEMENT_BY_PK,
  HIDE_INVOLVEMENT_BY_PK,
  INVOLVEMENT_INFORMATION_BY_USER_ID,
} from "@/graphql/involvement";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ActionCard } from "@/modules/shared/components/action-card";
import { LoadingButton } from "@/modules/shared/components/loading-button";
import { ProfileActiveLinks } from "../../../shared/components/profile-active-links";
import { usePathname } from "next/navigation";
import { ProfileAlertDialog } from "@/modules/shared/components/profile-alert-dialog";
import { GET_USER_BY_CLERK_ID } from "@/graphql/user";
import { CheckboxField } from "@/modules/shared/components/checkbox-input";

const involvementSchema = z
  .object({
    organizationRole: z.string().nonempty("Project title is required."),
    organizationName: z.string().nonempty("Organization is required."),
    organizationRoleStartDate: z.date({
      required_error: "Start date is required.",
    }),
    organizationRoleEndDate: z.date({
      required_error: "End date is required.",
    }),
    organizationCollege: z.string().nonempty("College is required."),
    organizationLocation: z.string().nonempty("College location is required"),

    organizationRoleDescription: z
      .string()
      .nonempty("Job description is required."),
    isCurrent: z.boolean().default(false).optional(),
  })
  .refine(
    (data) => data.organizationRoleStartDate < data.organizationRoleEndDate,
    {
      message: "Start date must be before end date",
      path: ["organizationRoleEndDate"],
    }
  );

export const Involvements = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof involvementSchema>>({
    resolver: zodResolver(involvementSchema),
    defaultValues: {
      organizationRole: "",
      organizationName: "",
      organizationRoleStartDate: new Date(),
      organizationRoleEndDate: new Date(),
      organizationCollege: "",
      organizationLocation: "",
      organizationRoleDescription: "",
      isCurrent: false,
    },
  });

  const { watch, setValue } = form;
  const isCurrent = watch("isCurrent");

  const role = watch("organizationRole");
  const name = watch("organizationName");
  const startDate = watch("organizationRoleStartDate");
  const endDate = watch("organizationRoleEndDate");
  const college = watch("organizationCollege");
  const location = watch("organizationLocation");
  const description = watch("organizationRoleDescription");

  const isStartDateValid =
    startDate instanceof Date && !isNaN(startDate.getTime());

  const isEndDateValid = !isCurrent
    ? endDate instanceof Date && !isNaN(endDate.getTime())
    : true;

  const isDateRangeValid = !isCurrent || (endDate && startDate < endDate);

  const isValid =
    role?.length > 0 &&
    name?.length > 0 &&
    isStartDateValid &&
    isEndDateValid &&
    isDateRangeValid &&
    college?.length > 0 &&
    location?.length > 0 &&
    description?.length > 0;

  useEffect(() => {
    if (isCurrent) {
      setValue("organizationRoleEndDate", new Date());
    }
  }, [isCurrent, setValue]);

  const { data: involvementData, loading: involvementLoading } =
    useSubscription(INVOLVEMENT_INFORMATION_BY_USER_ID, {
      variables: {
        _eq: user?.id,
      },
    });

  const visibleInvolvements = involvementData?.involvement?.filter(
    (inv: any) => inv.visibility === true
  );

  const sortedInvolvements = visibleInvolvements?.sort((a: any, b: any) => {
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;
    return 0;
  });

  const hiddenInvolvements = involvementData?.involvement?.filter(
    (inv: any) => inv.visibility === false
  );

  const allInvolvements = involvementData?.involvement?.map((e: any) => e);

  const hiddenInvolvementsLength =
    allInvolvements?.length - visibleInvolvements?.length;

  const [addInvolvement] = useMutation(ADD_NEW_INVOLVEMENT_BY_USER_ID);
  async function onSubmit(values: z.infer<typeof involvementSchema>) {
    try {
      setIsLoading(true);
      if (!user?.id) {
        throw new Error("User is not authenticated");
      } else {
        await addInvolvement({
          variables: {
            user_id: user?.id,
            involevement_organization: values.organizationName,
            involvement_college: values.organizationCollege,
            involvement_description: values.organizationRoleDescription,
            involvement_end_date: values.isCurrent
              ? ""
              : values.organizationRoleEndDate
              ? new Date(values.organizationRoleEndDate)
              : null,
            involvement_organization_role: values.organizationRole,
            involvement_start_date: values.organizationRoleStartDate,
            involvement_location: values.organizationLocation,
            isCurrent: isCurrent,
          },
        });

        toast({
          variant: "default",
          title: "Success.",
          description: "Your involvement was added to involvement list.",
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

  const [deleteInvolvement] = useMutation(DELETE_INVOLVEMENT_BY_PK);
  const deleteInvolvementAction = async (id: string) => {
    try {
      await deleteInvolvement({
        variables: {
          id,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your involvement was deleted from the involvement list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error deleting the involvement.",
      });
    }
  };

  const [hideInvolvementt] = useMutation(HIDE_INVOLVEMENT_BY_PK);
  const hideinvolvementAction = async (id: string) => {
    try {
      await hideInvolvementt({
        variables: {
          id,
          visibility: false,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your involvement was hide from the involvement list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error hiding the involvement.",
      });
    }
  };

  const unhideinvolvementAction = async (id: string) => {
    try {
      await hideInvolvementt({
        variables: {
          id,
          visibility: true,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your involvement was unhide from the involvement list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error unhiding the involvement.",
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
      <div className={"w-full flex flex-col lg:flex-row"}>
        <div className={"w-full lg:w-1/3"}>
          <div className={"rounded-sm overflow-hidden shadow mb-4"}>
            <video className={"w-full object-cover h-auto"} controls>
              <source src={"/video/resume-builder.mp4"} />
            </video>
          </div>
          <div>
            {involvementLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {involvementData?.involvement?.length > 0 && (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="involvement"
                  >
                    <AccordionItem value="involvement">
                      <AccordionTrigger className="text-xl font-semibold capitalize">
                        your involvements
                      </AccordionTrigger>
                      {hiddenInvolvementsLength ? (
                        <span>
                          You have {hiddenInvolvementsLength} hidden
                          involvement(s) in your bucket.
                        </span>
                      ) : (
                        ""
                      )}
                      {sortedInvolvements?.map((involvement: any) => (
                        <AccordionContent key={involvement.id}>
                          <ActionCard
                            id={involvement.id}
                            company={involvement.involevement_organization}
                            role={involvement.involvement_organization_role}
                            country={involvement.involvement_college}
                            fromDate={involvement.involvement_start_date}
                            toDate={involvement.involvement_end_date}
                            deleteTitle={"Delete your involvement."}
                            deleteDescription={
                              "Are you sure you want to delete this involvement? This action is irreversible and will permanently remove it from your involvements list."
                            }
                            deleteAction={() =>
                              deleteInvolvementAction(involvement.id)
                            }
                            hideTitle={"Hide this involvement."}
                            hideDescription={
                              "Are you sure you want to hide this involvement? This action is irreversible and will permanently hide the involvement from your list and master resume."
                            }
                            hideAction={() =>
                              hideinvolvementAction(involvement.id)
                            }
                            status={involvement.visibility}
                            tab="involvements"
                            isCurrent={isCurrent}
                          />
                        </AccordionContent>
                      ))}
                    </AccordionItem>

                    {hiddenInvolvementsLength > 0 && (
                      <AccordionItem value="involvement">
                        <AccordionTrigger className="text-xl font-semibold capitalize">
                          <div>
                            hidden involvements{" "}
                            <span
                              className={
                                "text-sm lowercase text-slate-600 font-normal"
                              }
                            >
                              ({hiddenInvolvementsLength} hidden involvement(s))
                            </span>
                          </div>
                        </AccordionTrigger>

                        {hiddenInvolvements?.map((involvement: any) => (
                          <AccordionContent key={involvement.id}>
                            <ActionCard
                              id={involvement.id}
                              company={involvement.involevement_organization}
                              role={involvement.involvement_organization_role}
                              country={involvement.involvement_college}
                              fromDate={involvement.involvement_start_date}
                              toDate={involvement.involvement_end_date}
                              deleteTitle={"Delete your involvement."}
                              deleteDescription={
                                "Are you sure you want to delete this involvement? This action is irreversible and will permanently remove it from your involvements list."
                              }
                              deleteAction={() =>
                                deleteInvolvementAction(involvement.id)
                              }
                              hideTitle={"Hide this involvement."}
                              hideDescription={
                                "Are you sure you want to hide this involvement? This action is irreversible and will permanently hide the involvement from your list and master resume."
                              }
                              hideAction={() =>
                                hideinvolvementAction(involvement.id)
                              }
                              unhideTitle={"Show this involvelement."}
                              unhideDescription={
                                "Are you sure you want to unhide this project? This action is irreversible and will permanently add the project from your list and master resume."
                              }
                              unhideAction={() =>
                                unhideinvolvementAction(involvement.id)
                              }
                              status={involvement.visibility}
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
                  fieldLabel={"What was your role at the organization?"}
                  fieldName={"organizationRole"}
                  control={form.control}
                  placeholder={"Selected Member"}
                  required={true}
                />
                <TextInput
                  fieldLabel={"For which organization did you work?"}
                  fieldName={"organizationName"}
                  control={form.control}
                  placeholder={"Economics Student Association"}
                  required={true}
                />
                <div className="flex flex-col gap-2">
                  <CalendarField
                    fieldLabel={"Start date"}
                    fieldName={"organizationRoleStartDate"}
                    control={form.control}
                    required={true}
                  />

                  <CheckboxField
                    fieldLabel="Is this your ongoing involvement?"
                    fieldName="isCurrent"
                    control={form.control}
                    required={!isCurrent}
                  />
                </div>

                {!isCurrent && (
                  <>
                    <CalendarField
                      fieldLabel={"End date"}
                      fieldName={"organizationRoleEndDate"}
                      control={form.control}
                      required={true}
                    />
                  </>
                )}
                <TextInput
                  fieldLabel={
                    "At which college/school/university was the organization located?"
                  }
                  fieldName={"organizationCollege"}
                  control={form.control}
                  placeholder={"University of Wisconsin, Madison"}
                  required={true}
                />
                <TextInput
                  fieldLabel={"Where was the organization located?"}
                  fieldName={"organizationLocation"}
                  control={form.control}
                  placeholder={"Wisconsin, MA"}
                  required={true}
                />
              </div>
              <div className={"mt-4 lg:mt-8 "}>
                <TextArea
                  fieldLabel={"What did you do at the organization?"}
                  fieldName={"organizationRoleDescription"}
                  control={form.control}
                  placeholder={
                    "Participated in forums and discussions presented by key economic thinkers and companies associated with the uniiversity."
                  }
                  required={true}
                />
              </div>

              <div className="flex justify-end w-full mt-8">
                <div className="w-38">
                  <ProfileAlertDialog
                    sectionName={"Involvements"}
                    planName={userData?.user[0]?.user_plan}
                    usedSlots={parseInt(involvementData?.involvement.length)}
                    disabled={!isValid}
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
