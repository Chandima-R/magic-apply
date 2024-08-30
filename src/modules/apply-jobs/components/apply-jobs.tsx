"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { FileDown, MailPlus, PlusCircle, Send, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/modules/shared/components/text-input";
import { CheckboxField } from "@/modules/shared/components/checkbox-input";
import { RequiredIndicator } from "@/modules/shared/components/required-indicator";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useMutation, useSubscription } from "@apollo/client";
import {
  ADD_NEW_APPLY_JOBS_ROW_BY_USER_ID,
  APPLY_JOBS_INFORMATION_BY_USER_ID,
  DELETE_APPLY_JOBS_ROW_BY_PK,
  UPDATE_APPLY_JOBS_ROW_BY_USER_ID,
} from "@/graphql/apply-jobs";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";
import { generateResponse } from "@/utils/chatgpt";
import { ADD_NEW_COVER_LETTER_BY_JOB_ID } from "@/graphql/cover-letter";
import { MultiInputField } from "@/modules/shared/mult-input-field";
import { CONTACT_INFORMATION } from "@/graphql/contact";
import { LoadingButton } from "@/modules/shared/components/loading-button";
import Link from "next/link";

const applyJobSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().optional(),
      jobDescription: z.string().min(2, {
        message: "Job Description is required",
      }),
      masterResume: z.union([
        z.string().min(2, {
          message: "Master Resume is required",
        }),
        z.boolean(),
        z.instanceof(File),
      ]),
      companyDescription: z.string().min(2, {
        message: "Company Description is required",
      }),
      additionalInfo: z.string().optional(),
      question1: z.string().optional(),
      question2: z.string().optional(),
      question3: z.string().optional(),
      coverLetter: z.boolean().optional(),
    })
  ),
});

export { applyJobSchema };

interface ScrollBarProps {
  children: ReactNode;
}

const ScrollBar: FC<ScrollBarProps> = ({ children }) => (
  <div className="overflow-auto h-auto p-4 rounded">{children}</div>
);

export const ApplyJobs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof applyJobSchema>>({
    resolver: zodResolver(applyJobSchema),
    defaultValues: {
      items: [
        {
          jobDescription: "",
          masterResume: "",
          companyDescription: "",
          additionalInfo: "",
          question1: "",
          question2: "",
          question3: "",
          coverLetter: false,
        },
      ],
    },
  });

  const {
    control,
    formState: {},
    handleSubmit,
    reset,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleAddItem = () => {
    append({
      jobDescription: "",
      masterResume: "",
      companyDescription: "",
      additionalInfo: "",
      question1: "",
      question2: "",
      question3: "",
      coverLetter: false,
    });
  };

  const handleDeleteItem = (index: string) => {
    remove(parseInt(index));
  };

  const [addApplyJobs] = useMutation(ADD_NEW_APPLY_JOBS_ROW_BY_USER_ID);
  const [updateApplyJobs] = useMutation(UPDATE_APPLY_JOBS_ROW_BY_USER_ID);

  const { data: jobsData, loading: jobsLoading } = useSubscription(
    APPLY_JOBS_INFORMATION_BY_USER_ID,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  const { data: contactData, loading: contactLoading } = useSubscription(
    CONTACT_INFORMATION,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  const signedUserData = contactData?.contact[0];

  useEffect(() => {
    if (jobsData && jobsData.apply_jobs.length > 0) {
      const formattedData = jobsData.apply_jobs.map(
        (job: {
          id: any;
          job_description: any;
          master_resume: any;
          company_description: any;
          additional_information: any;
          additional_question_one: any;
          additional_question_two: any;
          additional_question_three: any;
          cover_letter: any;
          cover_letters: any;
        }) => ({
          id: job.id,
          jobDescription: job.job_description,
          masterResume: job.master_resume,
          companyDescription: job.company_description,
          additionalInfo: job.additional_information,
          question1: job.additional_question_one,
          question2: job.additional_question_two,
          question3: job.additional_question_three,
          coverLetter: job.cover_letter,
        })
      );
      reset({ items: formattedData });
    } else {
      reset({
        items: [
          {
            jobDescription: "",
            masterResume: "",
            companyDescription: "",
            additionalInfo: "",
            question1: "",
            question2: "",
            question3: "",
            coverLetter: false,
          },
        ],
      });
    }
  }, [jobsData, reset]);

  async function onSubmit(data: z.infer<typeof applyJobSchema>) {
    try {
      setIsLoading(true);
      if (!user?.id) {
        throw new Error("User is not authenticated");
      } else {
        for (const item of data.items) {
          if (item.id) {
            await updateApplyJobs({
              variables: {
                id: item.id,
                _eq: item?.id,
                job_description: item.jobDescription,
                master_resume: item.masterResume,
                company_description: item.companyDescription,
                additional_information: item.additionalInfo,
                additional_question_one: item.question1,
                additional_question_two: item.question2,
                additional_question_three: item.question3,
                cover_letter: item.coverLetter,
                user_id: user?.id,
              },
            });
          } else {
            await addApplyJobs({
              variables: {
                job_description: item.jobDescription,
                master_resume: item.masterResume,
                company_description: item.companyDescription,
                additional_information: item.additionalInfo,
                additional_question_one: item.question1,
                additional_question_two: item.question2,
                additional_question_three: item.question3,
                cover_letter: item.coverLetter,
                user_id: user?.id,
              },
            });
          }
        }

        toast({
          variant: "default",
          title: "Success.",
          description: "Your application(s) were submitted successfully.",
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

  const [deleteApplyJobsRow] = useMutation(DELETE_APPLY_JOBS_ROW_BY_PK);
  const deleteApplyJobsRowAction = async (id: string) => {
    try {
      await deleteApplyJobsRow({
        variables: {
          _eq: id,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Row deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error deleting the row.",
      });
    }
    handleDeleteItem(id);
  };

  const [insertCoverLetter] = useMutation(ADD_NEW_COVER_LETTER_BY_JOB_ID);

  const handleApply = async (item: any) => {
    console.log("item id: ", item.id);
    const message = {
      jobDescription: item.jobDescription,
      companyDescription: item.companyDescription,
      masterResume: item.masterResume,
      name: signedUserData?.contact_name,
      email: signedUserData?.contact_email,
      city: signedUserData?.contact_city,
    };

    // TODO: add mutation to save the cover letter data with id which can taken from item id
    const promptType = "coverLetter";

    try {
      if (!user?.id) {
        throw new Error("User is not authenticated");
      }
      await generateResponse(promptType, message).then((response) => {
        console.log(12, item.id);
        // insertCoverLetter({
        //   variables: {
        //     apply_jobs_id: item.id,
        //     user_id: user?.id,
        //     letter: response,
        //   },
        // });
      });

      toast({
        variant: "default",
        title: "Applied Successfully.",
        description: "Your application has been submitted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Application Error",
        description: "There was a problem applying for the job.",
      });
    }
  };

  const handleDelete = (index: number) => {
    const item = fields[index];
    if (item.id) {
      deleteApplyJobsRowAction(item.id);
    }
  };

  return (
    <>
      {jobsLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div>
            <div className={"mb-8"}>
              <p className={"text-2xl font-semibold"}>Apply Jobs</p>
            </div>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ScrollBar>
                  {fields.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-4 gap-4 items-center border rounded-md p-4 mb-4"
                    >
                      <TextInput
                        fieldLabel={"Job Description (Paste or Link)"}
                        fieldName={`items[${index}].jobDescription`}
                        control={control}
                        placeholder={"Paste the JD (or link of JD here)"}
                      />
                      <MultiInputField
                        fieldLabel={"Master Resume Or Manual (Input or Paste)"}
                        fieldName={`items[${index}].masterResume`}
                        control={control}
                      />
                      <TextInput
                        fieldLabel={"Description of the Company"}
                        fieldName={`items[${index}].companyDescription`}
                        control={control}
                        placeholder={
                          "Describe in few sentences or paste the link of home page"
                        }
                      />
                      <TextInput
                        fieldLabel={
                          "Additional Information (Highlight any recent projects or experience)"
                        }
                        fieldName={`items[${index}].additionalInfo`}
                        control={control}
                        placeholder={"Describe if any"}
                      />
                      <TextInput
                        fieldLabel={" Additional Questions Asked 1"}
                        fieldName={`items[${index}].question1`}
                        control={control}
                        placeholder={"Write / Paste the Q here"}
                      />
                      <TextInput
                        fieldLabel={" Additional Questions Asked 2"}
                        fieldName={`items[${index}].question2`}
                        control={control}
                        placeholder={"Write / Paste the Q here"}
                      />
                      <TextInput
                        fieldLabel={" Additional Questions Asked 3"}
                        fieldName={`items[${index}].question3`}
                        control={control}
                        placeholder={"Write / Paste the Q here"}
                      />
                      <div className="flex items-center justify-end">
                        <CheckboxField
                          fieldLabel={" Cover Letter Needed"}
                          fieldName={`items[${index}].coverLetter`}
                          control={control}
                        />
                      </div>

                      <div className="col-span-4 mb-4">
                        <div className="flex items-center justify-end w-full gap-4">
                          {/* <Button
                            type="button"
                            size="sm"
                            className="bg-honoluluBlue hover:bg-blue-400/90 border-blue-400/20 p-2"
                          >
                            <FileDown className="size-4 mr-2" />
                            Download PDF
                          </Button> */}
                          <div>
                            {/* <Link href={`/apply-jobs/cover-letter/${item.id}`}> */}
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              className="bg-federalBlue hover:bg-blue-900/90 border-blue-900/20 p-2 text-white"
                            >
                              <MailPlus className="size-4 mr-2" />
                              Download cover letter
                            </Button>
                            {/* </Link> */}
                          </div>
                          {isLoading ? (
                            <div className="w-18">
                              <LoadingButton />
                            </div>
                          ) : (
                            <Button
                              type="submit"
                              size="sm"
                              className=" bg-blue-500 hover:bg-blue-600 text-white hover:text-white  border-blue-600"
                              onClick={() => handleApply(item)}
                            >
                              <Send className="size-4 mr-2" />
                              Generate
                            </Button>
                          )}
                          <Button
                            type="button"
                            onClick={handleAddItem}
                            className=" bg-blue-700 hover:bg-blue-800 text-white hover:text-white  border-blue-700"
                            size="sm"
                            variant={"outline"}
                          >
                            <PlusCircle className="size-4 mr-2" />
                            Add
                          </Button>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => {
                                handleDelete(index);
                              }}
                              className=" bg-red-500 text-white hover:bg-red-600 border-red-600 hover:text-white"
                              size="sm"
                              variant={"outline"}
                            >
                              <Trash2 className="size-4 mr-2" />
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollBar>

                <div className="flex justify-end w-full mt-8">
                  {/*<div className="w-38">*/}
                  {/*  {isLoading ? (*/}
                  {/*    <LoadingButton />*/}
                  {/*  ) : (*/}
                  {/*    <>*/}
                  {/*      <CustomButton*/}
                  {/*        type="submit"*/}
                  {/*        size={"sm"}*/}
                  {/*        title="Apply / Bulk Apply"*/}
                  {/*      />*/}
                  {/*    </>*/}
                  {/*  )}*/}
                  {/*</div>*/}

                  {/*<div className="w-38">*/}
                  {/*    <Button type="button" variant="outline" size={'sm'}>Excel Upload</Button>*/}
                  {/*</div>*/}
                </div>
              </form>
            </Form>
          </div>
        </>
      )}
    </>
  );
};
