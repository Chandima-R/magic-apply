import { Button } from "@/components/ui/button";
import { CustomAlertDialog } from "@/modules/shared/components/custom-alert-dialog";
import { EyeOff, Pencil, Trash } from "lucide-react";

interface Props {
  role: string;
  company: string;
}

export const ExperienceCard = ({ role, company }: Props) => {
  return (
    <div className="border p-2 rounded shadow cursor-pointer">
      <div className="mb-2">
        <h2 className="font-semibold text-lg capitalize">{role}</h2>
        <p className="font-semibold capitalize">{company}</p>
      </div>
      <div className="flex items-between gap-4">
        <Button
          size={"sm"}
          className="capitalize text-xs bg-honoluluBlue hover:bg-federalBlue gap-2"
        >
          <Pencil className="size-3" />
          edit
        </Button>

        <CustomAlertDialog
          buttonVariant={"destructive"}
          buttonSize={"sm"}
          buttonText={"delete"}
          title={"Delete your project."}
          description={
            "Are you sure to delete this project. This action cannot be undone and it will completely remove this project from your projects."
          }
          actionButtonText={"delete"}
          actionButtonFn={() => {}}
          icon={Trash}
        />

        <CustomAlertDialog
          buttonVariant={"outline"}
          buttonSize={"sm"}
          buttonText={"hide"}
          title={"Hide your project."}
          description={
            "Are you sure to hide this project. This action cannot be undone and it will completely hide this project from your projects."
          }
          actionButtonText={"hide"}
          actionButtonFn={() => {}}
          icon={EyeOff}
        />
      </div>
    </div>
  );
};
