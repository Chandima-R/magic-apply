import { z } from "zod";

const formSchema = z
  .object({
    jobDescription: z.string().min(2, "Job description is required."),
    customInput: z.enum(["masterResume", "fileUpload", "customText"]),
    masterResume: z.string().min(2, "Master resume is required.").optional(),
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
    coverLetter: z.string().optional(),
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

export const ApplyJobs = () => {
  return (
    <div>
      <p>apply jobs</p>
    </div>
  );
};
