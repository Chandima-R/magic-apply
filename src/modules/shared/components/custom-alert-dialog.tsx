import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface Props {
  buttonVariant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  buttonSize: "default" | "sm" | "lg" | "icon" | null | undefined;
  buttonText: string;
  title: string;
  description: string;
  actionButtonText: string;
  actionButtonFn: () => void;
  icon: LucideIcon;
}

export const CustomAlertDialog = ({
  actionButtonFn,
  actionButtonText,
  buttonSize,
  buttonText,
  buttonVariant,
  title,
  description,
  icon,
}: Props) => {
  console.log(11, actionButtonFn);
  const Icon = icon;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          className="capitalize gap-2"
        >
          <Icon className="size-3" />
          {buttonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={actionButtonFn} className="gap-2">
            <Icon className="size-4" />
            {actionButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
