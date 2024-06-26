import { Button } from "@/components/ui/button";
import { CustomAlertDialog } from "@/modules/shared/components/custom-alert-dialog";
import { format } from "date-fns";
import { EyeOff, Pencil, Trash } from "lucide-react";

interface Props {
  id: string;
  role?: string;
  company?: string;
  deleteAction: (id: string) => void;
  deleteTitle: string;
  deleteDescription: string;
  hideAction: (id: string) => void;
  hideTitle: string;
  hideDescription: string;
  country?: string;
  fromDate?: string;
  toDate?: string;
}

export const ActionCard = ({
  id,
  role,
  company,
  deleteAction,
  deleteTitle,
  deleteDescription,
  hideAction,
  hideTitle,
  hideDescription,
  country,
  fromDate,
  toDate,
}: Props) => {
  return (
    <div className="border p-2 rounded shadow cursor-pointer">
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg capitalize">{role}</h2>
          <p className="font-semibold">
            {fromDate && (
              <span>
                {format(fromDate, "dd MMMM, yyyy")} {" - "}
              </span>
            )}
            {toDate ? (
              <>
                <span>{format(toDate, "dd MMMM, yyyy")}</span>
              </>
            ) : (
              ""
            )}
          </p>
        </div>
        <p className="font-semibold capitalize flex gap-2">
          {company}
          {country && (
            <>
              , <span className="font-normal"> {country}</span>
            </>
          )}
        </p>
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
          title={deleteTitle}
          description={deleteDescription}
          actionButtonText={"delete"}
          actionButtonFn={() => deleteAction(id)}
          icon={Trash}
        />

        <CustomAlertDialog
          buttonVariant={"outline"}
          buttonSize={"sm"}
          buttonText={"hide"}
          title={hideTitle}
          description={hideDescription}
          actionButtonText={"hide"}
          actionButtonFn={() => hideAction(id)}
          icon={EyeOff}
        />
      </div>
    </div>
  );
};
