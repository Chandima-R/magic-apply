"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SelectInput } from "@/modules/shared/components/select-input";
import { TextInput } from "@/modules/shared/components/text-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { resumeSelection } from "./resume-selection";
import { CheckboxField } from "@/modules/shared/components/checkbox-input";
import { TextArea } from "@/modules/shared/components/text-area";
import { SingleFileDropBox } from "@/modules/shared/components/dropbox";
import { PlusCircle, Send, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useMutation, useSubscription } from "@apollo/client";
import {
  ADD_NEW_APPLY_JOBS_ROW_BY_USER_ID,
  APPLY_JOBS_INFORMATION_BY_USER_ID,
  DELETE_APPLY_JOBS_ROW_BY_PK,
  UPDATE_APPLY_JOBS_ROW_BY_USER_ID,
} from "@/graphql/apply-jobs";
import { CONTACT_INFORMATION } from "@/graphql/contact";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";
import { PlanOverlay } from "./plan-overlay";
import { GET_USER } from "@/graphql/user";

const groupSchema = z
  .object({
    jobDescription: z.string().min(2, "Job description is required."),
    customInput: z.enum(["masterResume", "fileUpload", "customText"]),
    masterResume: z.boolean().optional(),
    fileUpload: z
      .string()
      .min(2, "Your current resume format is required.")
      .optional(),
    customText: z
      .string()
      .min(2, "To generate a proper resume, custom text is required.")
      .optional(),
    companyDescription: z.string().min(2, "Company description is required."),
    additionalInformation: z.string().optional(),
    additionalQuestion1: z.string().optional(),
    additionalQuestion2: z.string().optional(),
    additionalQuestion3: z.string().optional(),
    coverLetter: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.customInput === "masterResume") return !!data.masterResume;
      if (data.customInput === "fileUpload") return !!data.fileUpload;
      if (data.customInput === "customText") return !!data.customText;
      return true;
    },
    {
      message: "Please provide the selected resume input.",
      path: ["customInput"],
    }
  );

const formSchema = z.object({
  groups: z.array(groupSchema),
});

export const ApplyJobs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groups: [
        {
          jobDescription: "",
          customInput: "masterResume",
          masterResume: true,
          fileUpload: "",
          customText: "",
          companyDescription: "",
          additionalInformation: "",
          additionalQuestion1: "",
          additionalQuestion2: "",
          additionalQuestion3: "",
          coverLetter: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "groups",
  });

  const [addApplyJobs] = useMutation(ADD_NEW_APPLY_JOBS_ROW_BY_USER_ID);
  const [updateApplyJobs] = useMutation(UPDATE_APPLY_JOBS_ROW_BY_USER_ID);

  const [deleteApplyJobsRow] = useMutation(DELETE_APPLY_JOBS_ROW_BY_PK);

  const deleteApplyJobsRowAction = async (id: string) => {
    try {
      await deleteApplyJobsRow({
        variables: {
          _eq: id, // Ensure this matches the mutation's requirement
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Row deleted successfully.",
      });

      // Refresh form state after successful deletion
      const updatedFields = form
        .getValues("groups")
        .filter((_, index) => fields[index].id !== id);
      form.reset({ groups: updatedFields });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error deleting the row.",
      });
    }
  };

  const handleDeleteItem = (index: any) => {
    remove(index);
  };

  const handleDelete = async (index: any) => {
    const item = fields[index];
    if (item.id) {
      await deleteApplyJobsRowAction(item.id);
    } else {
      handleDeleteItem(index);
    }
  };

  const { data: jobsData, loading: jobsLoading } = useSubscription(
    APPLY_JOBS_INFORMATION_BY_USER_ID,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  useEffect(() => {
    if (jobsData && jobsData.apply_jobs.length > 0) {
      const formattedData = jobsData.apply_jobs.map((job: any) => ({
        id: job.id,
        jobDescription: job.job_description,
        customInput: job.custom_input,
        masterResume: job.master_resume,
        fileUpload: job.file_upload,
        customText: job.custom_text,
        companyDescription: job.company_description,
        additionalInformation: job.additional_information,
        additionalQuestion1: job.additional_question_one,
        additionalQuestion2: job.additional_question_two,
        additionalQuestion3: job.additional_question_three,
        coverLetter: job.cover_letter,
      }));

      form.reset({ groups: formattedData });
    }
  }, [jobsData, form.reset]);

  async function onSectionSubmit(index: number) {
    const sectionData = form.getValues(`groups.${index}`);
    try {
      setIsLoading(true);

      if (!user?.id) {
        throw new Error("User is not authenticated");
      } else {
        await addApplyJobs({
          variables: {
            job_description: sectionData.jobDescription,
            master_resume: sectionData.masterResume,
            company_description: sectionData.companyDescription,
            additional_information: sectionData.additionalInformation,
            additional_question_one: sectionData.additionalQuestion1,
            additional_question_two: sectionData.additionalQuestion2,
            additional_question_three: sectionData.additionalQuestion3,
            cover_letter: sectionData.coverLetter,
            custom_input: sectionData.customInput,
            file_upload: sectionData.fileUpload,
            custom_text: sectionData.customText,
            user_id: user?.id,
          },
        });
      }

      toast({
        variant: "default",
        title: "Success.",
        description: "Your application(s) were submitted successfully.",
      });
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

  const { data: userData, loading: userLoading } = useSubscription(GET_USER);

  const activeUser = userData?.user?.find(
    (existingUser: any) => existingUser.user_clerk_id === user?.id
  );

  return (
    <>
      {activeUser?.user_plan.toLowerCase() === "free" && <PlanOverlay />}
      {jobsLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})}>
              {fields.map((field, index) => {
                const watchedMasterResume = form.watch(
                  `groups.${index}.customInput`
                );
                return (
                  <div key={field.id}>
                    <div className="grid grid-cols-4 gap-4 items-start border rounded-md p-4 mb-4 bg-gray-50">
                      <TextInput
                        fieldLabel="Job Description (Paste or Link)"
                        fieldName={`groups.${index}.jobDescription`}
                        control={form.control}
                        placeholder="Paste the JD (or link of JD here)"
                        required
                      />

                      <div>
                        <SelectInput
                          fieldName={`groups.${index}.customInput`}
                          fieldLabel="Master Resume Or Manual (Input or Paste)"
                          placeholder="Select your choice"
                          control={form.control}
                          options={
                            resumeSelection?.map((opt: any) => ({
                              label: opt.label,
                              value: opt.value,
                            })) || []
                          }
                        />

                        <div className="mt-4">
                          {watchedMasterResume === "masterResume" && (
                            <CheckboxField
                              fieldLabel="Use current master resume"
                              fieldName={`groups.${index}.masterResume`}
                              control={form.control}
                            />
                          )}

                          {watchedMasterResume === "customText" && (
                            <TextArea
                              fieldLabel="Add a custom description here"
                              fieldName={`groups.${index}.customText`}
                              control={form.control}
                              placeholder="Add a custom description here.."
                              required
                            />
                          )}

                          {watchedMasterResume === "fileUpload" && (
                            <SingleFileDropBox
                              fieldLabel="Upload your resume here"
                              fieldName={`groups.${index}.fileUpload`}
                              control={form.control}
                              required
                              setValue={form.setValue}
                              setUploading={() => {}}
                            />
                          )}
                        </div>
                      </div>

                      <TextInput
                        fieldLabel="Description of the Company"
                        fieldName={`groups.${index}.companyDescription`}
                        control={form.control}
                        placeholder="Describe in few sentences or paste the link of home page"
                        required
                      />
                      <TextInput
                        fieldLabel="Additional Information (Highlight any recent projects or experience)"
                        fieldName={`groups.${index}.additionalInformation`}
                        control={form.control}
                        placeholder="Describe if any"
                      />
                      <TextInput
                        fieldLabel="Additional Questions Asked 1"
                        fieldName={`groups.${index}.additionalQuestion1`}
                        control={form.control}
                        placeholder="Write / Paste the Q here"
                      />
                      <TextInput
                        fieldLabel="Additional Questions Asked 2"
                        fieldName={`groups.${index}.additionalQuestion2`}
                        control={form.control}
                        placeholder="Write / Paste the Q here"
                      />
                      <TextInput
                        fieldLabel="Additional Questions Asked 3"
                        fieldName={`groups.${index}.additionalQuestion3`}
                        control={form.control}
                        placeholder="Write / Paste the Q here"
                      />
                      <div className="flex items-center pt-4">
                        <CheckboxField
                          fieldLabel="Cover Letter Needed"
                          fieldName={`groups.${index}.coverLetter`}
                          control={form.control}
                        />
                      </div>

                      <div className="col-span-4 mb-4">
                        <div className="flex items-center justify-end w-full gap-4">
                          <Button
                            type="submit"
                            size="sm"
                            className="bg-honoluluBlue hover:bg-federalBlue text-white hover:text-white border-federalBlue"
                            onClick={() => onSectionSubmit(index)}
                          >
                            <Send className="size-4 mr-2" />
                            Generate
                          </Button>

                          {index === fields.length - 1 && (
                            <Button
                              type="button"
                              onClick={() =>
                                append({
                                  jobDescription: "",
                                  companyDescription: "",
                                  customInput: "masterResume",
                                  masterResume: false,
                                  fileUpload: "",
                                  customText: "",
                                  additionalInformation: "",
                                  additionalQuestion1: "",
                                  additionalQuestion2: "",
                                  additionalQuestion3: "",
                                  coverLetter: false,
                                })
                              }
                              className="bg-blue-700 hover:bg-blue-800 text-white hover:text-white border-blue-700"
                              size="sm"
                              variant={"outline"}
                            >
                              <PlusCircle className="size-4 mr-2" />
                              Add
                            </Button>
                          )}

                          {fields.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => {
                                handleDelete(index);
                              }}
                              className="bg-red-500 text-white hover:bg-red-600 border-red-600 hover:text-white"
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
                  </div>
                );
              })}
            </form>
          </Form>
        </>
      )}
    </>
  );
};
