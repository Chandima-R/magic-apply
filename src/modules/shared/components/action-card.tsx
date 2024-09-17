import { Button } from "@/components/ui/button";
import { CustomAlertDialog } from "@/modules/shared/components/custom-alert-dialog";
import { format } from "date-fns";
import { Eye, EyeOff, Pencil, Trash } from "lucide-react";
import Link from "next/link";

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
  toDate?: any;
  unhideAction?: (id: string) => void;
  unhideTitle?: string;
  unhideDescription?: string;
  status: boolean;
  tab?: string;
  isCurrent?: boolean;
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
  unhideAction,
  unhideTitle,
  unhideDescription,
  status,
  tab,
}: Props) => {
  return (
    <div
      className={`border p-2 rounded shadow cursor-pointer ${
        status ? "bg-white" : "bg-gray-200"
      }`}
    >
      <div className="mb-2">
        <div className="flex items-start justify-between mb-2">
          <div className={"w-full"}>
            <h2 className="font-semibold text-lg capitalize leading-4">
              {role}
            </h2>
          </div>
          <div className={"w-full flex justify-end"}>
            <p className="font-semibold text-right">
              {fromDate && (
                <span>
                  {fromDate?.length > 4 ? (
                    <>
                      {format(fromDate, "dd MMM, yyyy")} {" - "}
                    </>
                  ) : (
                    <>{fromDate}</>
                  )}
                </span>
              )}

              {toDate?.length > 0 ? (
                <>
                  {toDate?.length > 4 ? (
                    <span>{format(toDate, "dd MMM, yyyy")}</span>
                  ) : (
                    <span>{format(toDate, "yyyy")}</span>
                  )}
                </>
              ) : (
                <span>Current</span>
              )}
            </p>
          </div>
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
        {status && (
          <>
            <Link href={`/profile/${tab}/${id}/edit`}>
              <Button
                size={"sm"}
                className="capitalize text-sm bg-honoluluBlue hover:bg-blue-700 gap-2"
              >
                <Pencil className="size-3" />
                edit
              </Button>
            </Link>

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
          </>
        )}

        <CustomAlertDialog
          buttonVariant={"outline"}
          buttonSize={"sm"}
          buttonText={status ? "hide" : "show"}
          title={status ? hideTitle : unhideTitle}
          description={status ? hideDescription : unhideDescription}
          actionButtonText={status ? "hide" : "show"}
          actionButtonFn={
            status ? () => hideAction(id) : () => unhideAction?.(id)
          }
          icon={status ? EyeOff : Eye}
        />
      </div>
    </div>
  );
};
