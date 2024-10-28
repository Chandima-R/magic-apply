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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groups: [
        {
          jobDescription: "",
          customInput: "masterResume",
          masterResume: false,
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

  function onSectionSubmit(index: number) {
    const sectionData = form.getValues(`groups.${index}`);
    console.log("Submit section:", sectionData);
  }

  return (
    <div>
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
                              masterResume: "",
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
                          onClick={() => remove(index)}
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
    </div>
  );
};
