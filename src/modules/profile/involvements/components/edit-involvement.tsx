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
  DELETE_INVOLVEMENT_BY_PK,
  HIDE_INVOLVEMENT_BY_PK,
  INVOLVEMENT_INFORMATION_BY_USER_ID,
  UPDATE_INVOLVEMENT_BY_ID,
  VIEW_INVOLVEMENT_BY_ID,
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
import { usePathname, useRouter } from "next/navigation";

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
    organizationLocation: z.string().nonempty("Company Location is required."),
    organizationRoleDescription: z
      .string()
      .nonempty("Job description is required."),
  })
  .refine(
    (data) => data.organizationRoleStartDate < data.organizationRoleEndDate,
    {
      message: "Start date must be before end date",
      path: ["organizationRoleEndDate"],
    }
  );

export const EditInvolvement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const pathname = usePathname();
  const involvementId = pathname.split("/")[3];

  const form = useForm<z.infer<typeof involvementSchema>>({
    resolver: zodResolver(involvementSchema),
    defaultValues: {
      organizationRole: "",
      organizationName: "",
      organizationRoleStartDate: new Date(),
      organizationRoleEndDate: new Date(),
      organizationLocation: "",
      organizationRoleDescription: "",
    },
  });

  const { data: involvementData, loading: involvementLoading } =
    useSubscription(INVOLVEMENT_INFORMATION_BY_USER_ID, {
      variables: {
        _eq: user?.id,
      },
    });

  const { data: editData } = useSubscription(VIEW_INVOLVEMENT_BY_ID, {
    variables: {
      _eq: involvementId,
    },
  });

  const visibleInvolvements = involvementData?.involvement?.filter(
    (inv: any) => inv.visibility === true
  );

  const hiddenInvolvements = involvementData?.involvement?.filter(
    (inv: any) => inv.visibility === false
  );

  const allInvolvements = involvementData?.involvement?.map((e: any) => e);

  const hiddenInvolvementsLength =
    allInvolvements?.length - visibleInvolvements?.length;

  useEffect(() => {
    if (editData && editData?.involvement) {
      const involvement = editData?.involvement[0];
      form.reset({
        organizationRole: involvement.involvement_organization_role,
        organizationName: involvement.involevement_organization,
        organizationRoleStartDate: involvement.involvement_start_date,
        organizationRoleEndDate: involvement.involvement_end_date,
        organizationLocation: involvement.involvement_college,
        organizationRoleDescription: involvement.involvement_description,
      });
    }
  }, [editData, form]);

  const [editInvolvement] = useMutation(UPDATE_INVOLVEMENT_BY_ID);
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof involvementSchema>) {
    try {
      setIsLoading(true);
      if (!user?.id) {
        throw new Error("User is not authenticated");
      } else {
        await editInvolvement({
          variables: {
            _eq: involvementId,
            user_id: user?.id,
            involevement_organization: values.organizationName,
            involvement_college: values.organizationLocation,
            involvement_description: values.organizationRoleDescription,
            involvement_end_date: values.organizationRoleEndDate,
            involvement_organization_role: values.organizationRole,
            involvement_start_date: values.organizationRoleStartDate,
          },
        });

        toast({
          variant: "default",
          title: "Success.",
          description: "Your involvement was updated.",
        });
      }
      form.reset();
      router.push("/profile/involvement");
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

  return (
    <>
      <ProfileActiveLinks activeLink={activeLink} />
      {involvementLoading ? (
        <LoadingSpinner />
      ) : (
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
                        {visibleInvolvements?.map((involvement: any) => (
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
                                "Are you sure to delete this involvement. This action cannot be undone and it will completely remove this involvement from your involvements."
                              }
                              deleteAction={() =>
                                deleteInvolvementAction(involvement.id)
                              }
                              hideTitle={"Hide your involvement."}
                              hideDescription={
                                "Are you sure to hide this involvement. This action cannot be undone and it will completely hide this involvement from your involvements."
                              }
                              hideAction={() =>
                                hideinvolvementAction(involvement.id)
                              }
                              status={involvement.visibility}
                              tab="involvement"
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
                                ({hiddenInvolvementsLength} hidden
                                involvement(s))
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
                                  "Are you sure to delete this involvement. This action cannot be undone and it will completely remove this involvement from your involvements."
                                }
                                deleteAction={() =>
                                  deleteInvolvementAction(involvement.id)
                                }
                                hideTitle={"Hide your involvement."}
                                hideDescription={
                                  "Are you sure to hide this involvement. This action cannot be undone and it will completely hide this involvement from your involvements."
                                }
                                hideAction={() =>
                                  hideinvolvementAction(involvement.id)
                                }
                                unhideTitle={"Unhide your involvelement."}
                                unhideDescription={
                                  "Are you sure to unhide this involvement. This action cannot be undone and it will completely add this involvement to your involvements list."
                                }
                                unhideAction={() =>
                                  unhideinvolvementAction(involvement.id)
                                }
                                status={involvement.visibility}
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
                  <CalendarField
                    fieldLabel={"Start date"}
                    fieldName={"organizationRoleStartDate"}
                    control={form.control}
                    required={true}
                  />
                  <CalendarField
                    fieldLabel={"End date"}
                    fieldName={"organizationRoleEndDate"}
                    control={form.control}
                    required={true}
                  />
                  <TextInput
                    fieldLabel={
                      "At which college was the organization located?"
                    }
                    fieldName={"organizationLocation"}
                    control={form.control}
                    placeholder={"University of Wisconsin, Madison"}
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
                    {isLoading ? (
                      <LoadingButton />
                    ) : (
                      <>
                        <CustomButton type="submit" title="Edit involvement" />
                      </>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
