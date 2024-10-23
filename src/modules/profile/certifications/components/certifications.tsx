"use client";

import { Form } from "@/components/ui/form";
import { TextInput } from "@/modules/shared/components/text-input";
import { TextArea } from "@/modules/shared/components/text-area";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import {
  ADD_NEW_CERTIFICATE_BY_USER_ID,
  CERTIFICATE_INFORMATION_BY_USER_ID,
  DELETE_CERTIFICATE_BY_PK,
  HIDE_CERTIFICATE_BY_PK,
} from "@/graphql/certification";
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
import { ProfileActiveLinks } from "../../../shared/components/profile-active-links";
import { ProfileAlertDialog } from "@/modules/shared/components/profile-alert-dialog";
import { GET_USER_BY_CLERK_ID } from "@/graphql/user";

const certificationSchema = z.object({
  certificateName: z.string().nonempty("Certificate name is required."),
  certificateInstitute: z
    .string()
    .nonempty("Certificate issued institute is required."),
  certificateDate: z
    .string()
    .nonempty("Certificate issued date is required.")
    .regex(/^\d+$/, "Certificate issued date must be a number."),

  certificateDescription: z.string(),
});
export const Certifications = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof certificationSchema>>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      certificateName: "",
      certificateInstitute: "",
      certificateDate: "",
      certificateDescription: "",
    },
  });

  const { watch } = form;

  const name = watch("certificateName");
  const institute = watch("certificateInstitute");
  const date = watch("certificateDate");
  const description = watch("certificateDescription");

  const isValid =
    name?.length > 0 &&
    institute?.length > 0 &&
    date?.length > 0 &&
    description?.length > 0;

  const { data: certificateData, loading: certificateLoding } = useSubscription(
    CERTIFICATE_INFORMATION_BY_USER_ID,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  const visibleCertificates = certificateData?.certification?.filter(
    (c: any) => c.visibility === true
  );

  const hiddenCertificates = certificateData?.certification?.filter(
    (c: any) => c.visibility === false
  );

  const allCertificates = certificateData?.certification?.map((c: any) => c);

  const hiddenCertificatesLength =
    allCertificates?.length - visibleCertificates?.length;

  const [addCertificate] = useMutation(ADD_NEW_CERTIFICATE_BY_USER_ID);
  async function onSubmit(values: z.infer<typeof certificationSchema>) {
    try {
      setIsLoading(true);
      if (!user?.id) {
        throw new Error("User is not authenticated");
      } else {
        await addCertificate({
          variables: {
            certification_completion_year: values.certificateDate,
            certification_description: values.certificateDescription,
            certification_institute: values.certificateInstitute,
            certification_name: values.certificateName,
            user_id: user?.id,
          },
        });

        toast({
          variant: "default",
          title: "Success.",
          description: "Your certificate was added to certifications list.",
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

  const [deleteCertification] = useMutation(DELETE_CERTIFICATE_BY_PK);
  const deleteCertifictionAction = async (id: string) => {
    try {
      await deleteCertification({
        variables: {
          id,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description:
          "Your certification was deleted from the certifications list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error deleting the certificate.",
      });
    }
  };

  const [hideCertification] = useMutation(HIDE_CERTIFICATE_BY_PK);
  const hideCertificationAction = async (id: string) => {
    try {
      await hideCertification({
        variables: {
          id,
          visibility: false,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your certificate was hide from the certifications list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error hiding the certificate.",
      });
    }
  };

  const unhideCertificationAction = async (id: string) => {
    try {
      await hideCertification({
        variables: {
          id,
          visibility: true,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your certificate was added to the certifications list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error adding the certificate.",
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
            {certificateLoding ? (
              <LoadingSpinner />
            ) : (
              <>
                {certificateData?.certification?.length > 0 && (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="certification"
                  >
                    <AccordionItem value="certification">
                      <AccordionTrigger className="text-xl font-semibold capitalize">
                        your ceritications
                      </AccordionTrigger>
                      {hiddenCertificatesLength ? (
                        <span>
                          You have {hiddenCertificatesLength} hidden
                          certificates in your bucket.
                        </span>
                      ) : (
                        ""
                      )}
                      {visibleCertificates?.map((certificate: any) => (
                        <AccordionContent key={certificate.id}>
                          <ActionCard
                            id={certificate.id}
                            company={certificate.certification_institute}
                            role={certificate.certification_name}
                            country={""}
                            fromDate={""}
                            toDate={certificate.certification_completion_year}
                            deleteTitle={"Delete your certification."}
                            deleteDescription={
                              " Are you sure you want to delete this certificate? This action is irreversible and will permanently remove it from your certificate list."
                            }
                            deleteAction={() =>
                              deleteCertifictionAction(certificate.id)
                            }
                            hideTitle={"Hide this certification."}
                            hideDescription={
                              "Are you sure you want to hide this certificate? This action is irreversible and will permanently hide the certificate from your list and master resume."
                            }
                            hideAction={() =>
                              hideCertificationAction(certificate.id)
                            }
                            status={certificate.visibility}
                            tab={"certifications"}
                          />
                        </AccordionContent>
                      ))}
                    </AccordionItem>

                    {hiddenCertificates?.map((certificate: any) => (
                      <AccordionContent key={certificate.id}>
                        <ActionCard
                          id={certificate.id}
                          company={certificate.certification_institute}
                          role={certificate.certification_name}
                          country={""}
                          fromDate={""}
                          toDate={certificate.certification_completion_year}
                          deleteTitle={"Delete your certification."}
                          deleteDescription={
                            " Are you sure you want to delete this certificate? This action is irreversible and will permanently remove it from your certificates list."
                          }
                          deleteAction={() =>
                            deleteCertifictionAction(certificate.id)
                          }
                          hideTitle={"Hide this certification."}
                          hideDescription={
                            "Are you sure you want to hide this certificate? This action is irreversible and will permanently hide the certificate from your list and master resume."
                          }
                          hideAction={() =>
                            hideCertificationAction(certificate.id)
                          }
                          unhideTitle={"Show this certification."}
                          unhideDescription={
                            "Are you sure you want to unhide this certificate? This action is irreversible and will permanently add the certificate from your list and master resume."
                          }
                          unhideAction={() =>
                            unhideCertificationAction(certificate.id)
                          }
                          status={certificate.visibility}
                        />
                      </AccordionContent>
                    ))}
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
                  fieldLabel={"What was the certificate name?"}
                  fieldName={"certificateName"}
                  control={form.control}
                  placeholder={"Project management professional(PMP)"}
                  required={true}
                />
                <TextInput
                  fieldLabel={"Where did you get the certificate?"}
                  fieldName={"certificateInstitute"}
                  control={form.control}
                  placeholder={"Project management institute"}
                  required={true}
                />
                <TextInput
                  fieldLabel={"When did you get the certificate?"}
                  fieldName={"certificateDate"}
                  control={form.control}
                  placeholder={"2024"}
                  required={true}
                />
                <TextArea
                  fieldLabel={"How is the certificate relevant?"}
                  fieldName={"certificateDescription"}
                  control={form.control}
                  placeholder={
                    "Certified in a standardized and evolving set of project management principles.."
                  }
                  required={false}
                />
              </div>

              <div className="flex justify-end w-full mt-8">
                <div className="w-38">
                  <ProfileAlertDialog
                    sectionName={"Certifications"}
                    planName={userData?.user[0]?.user_plan}
                    usedSlots={parseInt(certificateData?.certification.length)}
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
