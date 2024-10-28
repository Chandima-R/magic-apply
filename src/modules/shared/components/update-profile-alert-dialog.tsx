import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { LoadingButton } from "./loading-button";

interface Props {
  sectionName: string;
  disabled: boolean;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const UpdateProfileAlertDialog = ({
  disabled,
  onConfirm,
  sectionName,
  isLoading,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          disabled={disabled}
          className="w-full uppercase bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue"
        >
          <span>Update {sectionName}</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-lg p-6 rounded-lg shadow-lg bg-white">
        <AlertDialogHeader className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <AlertTriangle className="text-red-500" size={28} />{" "}
            <h2 className="font-bold text-xl">Update {sectionName}</h2>
          </div>
          <AlertDialogDescription className="mt-2 text-sm text-gray-500">
            <p>
              <strong>Important:</strong> You are about to update your{" "}
              <strong>{sectionName}</strong>. Please review all changes
              carefully before proceeding.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col items-center space-y-3 mt-6">
          <AlertDialogCancel className="btn-secondary absolute rounded-full h-10 w-10 top-2 right-2 p-0">
            <X className="size-4" />
          </AlertDialogCancel>

          {isLoading ? (
            <div className="w-full">
              <LoadingButton />
            </div>
          ) : (
            <Button
              onClick={handleConfirm}
              className="w-full uppercase bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue"
            >
              <CheckCircle className="mr-2" size={18} /> Confirm Update
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
