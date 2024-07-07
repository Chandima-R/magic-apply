"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextArea } from "@/modules/shared/components/text-area";
import { Form } from "@/components/ui/form";
import { CustomButton } from "@/modules/shared/components/custom-button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import {
  ADD_NEW_SUMMARY_BY_USER_ID,
  SUMMARY_INFORMATION_BY_USER_ID,
  UPDATE_SUMMARY_BY_ID,
} from "@/graphql/summary";
import { useMutation, useSubscription } from "@apollo/client";
import { LoadingButton } from "@/modules/shared/components/loading-button";
import { usePathname } from "next/navigation";
import { ProfileActiveLinks } from "@/modules/shared/components/profile-active-links";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";

const summarySchema = z.object({
  summary: z.string().nonempty("Summary is required."),
});

export const Summary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof summarySchema>>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: "",
    },
  });

  const [addSummary] = useMutation(ADD_NEW_SUMMARY_BY_USER_ID);
  const [updateSummary] = useMutation(UPDATE_SUMMARY_BY_ID);

  const { data: summaryData, loading: summaryLoading } = useSubscription(
    SUMMARY_INFORMATION_BY_USER_ID,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  useEffect(() => {
    if (summaryData?.summary.length > 0) {
      form.reset({ summary: summaryData.summary[0].summary_description });
    }
  }, [summaryData, form]);

  const existingSummary = summaryData?.summary[0];

  async function onSubmit(values: z.infer<typeof summarySchema>) {
    if (values) {
      try {
        setIsLoading(true);
        if (existingSummary) {
          await updateSummary({
            variables: {
              _eq: existingSummary.id,
              id: existingSummary.id,
              summary_description: values.summary,
            },
          });
          toast({
            variant: "default",
            title: "Success.",
            description: "Your Summary was updated.",
          });
        } else {
          await addSummary({
            variables: {
              summary_description: values.summary,
              user_id: user?.id,
            },
          });
          toast({
            variant: "default",
            title: "Success.",
            description: "Your Summary was added.",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  }

  const path = usePathname();
  const activeLink = path.split("/")[2];

  return (
    <>
      <ProfileActiveLinks activeLink={activeLink} />
      {summaryLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3">
            <div className="rounded-sm overflow-hidden shadow">
              <video className="w-full object-cover h-auto" controls>
                <source src="/video/resume-builder.mp4" />
              </video>
            </div>
          </div>
          <div className="w-full lg:w-2/3 px-2 lg:px-6 py-4 lg:py-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="gap-4 lg:gap-8 grid grid-cols-1 w-full">
                  <TextArea
                    fieldLabel="Write a professional summary"
                    fieldName="summary"
                    control={form.control}
                    placeholder="Experienced in global early-stage executive with economics and mathematics degree from the University ow Wisconsin. Passion for building inspiring companies people love through industry-leading design, development, branding and making big bets."
                    required
                  />
                </div>

                <div className="flex justify-end w-full mt-8">
                  <div className="w-38">
                    {isLoading ? (
                      <LoadingButton />
                    ) : existingSummary?.summary_description?.length > 0 ? (
                      <CustomButton type="submit" title="Update summary" />
                    ) : (
                      <CustomButton type="submit" title="Save summary info" />
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
