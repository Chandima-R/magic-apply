import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { OctagonAlert, X } from "lucide-react";

interface Props {
  alertTitle: string;
  disabled?: boolean;
  alertDialogHeader: string;
  alertDialogIcon: React.ReactNode;
  alertDialogDescription?: string;
  alertDialogActionButton: string;
  onConfirm: () => void;
}

export const CustomConfirmDialog = ({
  alertTitle,
  disabled,
  alertDialogHeader,
  alertDialogIcon,
  alertDialogDescription,
  alertDialogActionButton,
  onConfirm,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          disabled={disabled}
          className={
            "w-full uppercase bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue"
          }
        >
          {alertTitle}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex items-center">
          <OctagonAlert className="mr-2 text-red-500" size={48} />
          <AlertDialogTitle className="text-red-600">
            {alertDialogHeader}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="mt-4 text-md">
          <p className="text-gray-700">{alertDialogDescription}</p>
        </AlertDialogDescription>
        <AlertDialogFooter className="mt-4 flex items-center justify-end flex-row gap-4">
          <AlertDialogCancel className="btn-secondary absolute rounded-full h-10 w-10 top-2 right-2 p-0">
            <X className="size-4" />
          </AlertDialogCancel>
          <Button
            className="w-auto uppercase bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue"
            type="submit"
            size={"sm"}
            onClick={handleConfirm}
          >
            {alertDialogActionButton}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
