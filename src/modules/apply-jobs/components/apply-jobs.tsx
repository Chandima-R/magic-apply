"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { CheckboxField } from "@/modules/shared/components/checkbox-input";
import { LoadingButton } from "@/modules/shared/components/loading-button";
import { TextInput } from "@/modules/shared/components/text-input";
import { MultiInputField } from "@/modules/shared/mult-input-field";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailPlus, PlusCircle, Send } from "lucide-react";
import Link from "next/link";
import { FC, ReactNode, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

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

  async function onSubmit(data: z.infer<typeof applyJobSchema>) {
    console.log(data);
  }

  return (
    <>
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
                    {isLoading ? (
                      <div className="w-18">
                        <LoadingButton />
                      </div>
                    ) : (
                      <Button
                        type="submit"
                        size="sm"
                        className=" bg-blue-500 hover:bg-blue-600 text-white hover:text-white  border-blue-600"
                      >
                        <Send className="size-4 mr-2" />
                        Generate
                      </Button>
                    )}
                    <Button
                      type="button"
                      className=" bg-blue-700 hover:bg-blue-800 text-white hover:text-white  border-blue-700"
                      size="sm"
                      variant={"outline"}
                    >
                      <PlusCircle className="size-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </ScrollBar>
        </form>
      </Form>
    </>
  );
};
