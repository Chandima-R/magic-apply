import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RequiredIndicator } from "./required-indicator";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DropboxProps {
  fieldName: string;
  fieldLabel: string;
  control: any;
  required: boolean;
  setValue: any;
  setUploading: (uploading: boolean) => void;
}

export const SingleFileDropBox = ({
  fieldName,
  fieldLabel,
  control,
  required,
  setValue,
  setUploading,
}: DropboxProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0); // State for upload progress

  const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    },
  });

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
      setError("You can only upload one file.");
      return;
    }

    const file = acceptedFiles[0];

    if (
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      setError("Only PDF, DOC, and DOCX files are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB.");
      return;
    }

    setError(null);
    setPreview(URL.createObjectURL(file));
    setSelectedFile(file);
    setUploading(true);

    try {
      const params: any = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
        Key: `uploads/${file.name}`,
        Body: file,
        ContentType: file.type,
        ACL: "public-read",
      };

      // Upload file and track progress
      const uploadCommand = new PutObjectCommand(params);
      const response = await s3Client.send(uploadCommand);

      // Simulate upload progress for demo purposes
      let uploadProgress = 0;
      const interval = setInterval(() => {
        uploadProgress += 20; // Increment progress
        setProgress(uploadProgress);

        if (uploadProgress >= 100) {
          clearInterval(interval);
        }
      }, 200);

      const fileUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/uploads/${file.name}`;
      setUploadedFileUrl(fileUrl);
      setValue(fieldName, fileUrl);
    } catch (error) {
      setError("Error uploading file. Please try again.");
      console.error("Error uploading file: ", error);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = async () => {
    if (!uploadedFileUrl) return;

    try {
      const fileName = uploadedFileUrl.split("/").pop();
      const deleteParams = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME as string,
        Key: `uploads/${fileName}`,
      };

      const deleteCommand = new DeleteObjectCommand(deleteParams);
      await s3Client.send(deleteCommand);

      setSelectedFile(null);
      setPreview(null);
      setUploadedFileUrl(null);
      setValue(fieldName, "");
    } catch (error) {
      setError("Error removing file. Please try again.");
      console.error("Error removing file: ", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: [".pdf", ".doc", ".docx"],
    maxSize: 10 * 1024 * 1024,
    onDrop,
  });

  const getFileTypeImage = (fileType: string) => {
    switch (fileType) {
      case "application/pdf":
        return "/images/pdf-file.svg";
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "/images/word-file.svg";
      default:
        return "/images/file.svg";
    }
  };

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize gap-1 flex text-black">
            {fieldLabel}
            {required && <RequiredIndicator />}
          </FormLabel>
          <FormControl>
            <>
              {!uploadedFileUrl && (
                <div
                  {...getRootProps()}
                  className="flex flex-col items-center justify-center border border-dashed border-gray-400 p-4"
                >
                  <input {...getInputProps()} />
                  <p className="text-xs">
                    Drag & drop a file here, or click to select a file
                  </p>
                </div>
              )}
              {uploadedFileUrl && selectedFile && (
                <div className="mt-4 flex items-center justify-between p-4 border rounded bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <img
                      src={getFileTypeImage(selectedFile.type)}
                      alt="file icon"
                      className="w-8 h-8"
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {selectedFile.name}
                      </p>
                      {/* <p className="text-sm text-gray-600">
                        {selectedFile.type}
                      </p> */}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-red-500 border p-1 rounded-full border-red-500"
                    onClick={removeFile}
                  >
                    <X className="size-4" />
                  </button>
                </div>
              )}
              {error && (
                <p className="text-red-500 text-sm font-semibold">{error}</p>
              )}
              {/* Show progress bar during upload */}
              {progress > 0 && progress < 100 && (
                <div className="mt-2">
                  <Progress value={progress} className="h-0.5" />
                </div>
              )}
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
