import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  userPlan: string;
  usedSlots: number;
}

export const CustomPopupButton = ({ title, userPlan, usedSlots }: Props) => {
  const slots =
    userPlan?.toLowerCase() === "free"
      ? 5
      : userPlan?.toLowerCase() === "basic"
      ? 10
      : userPlan?.toLowerCase() === "premium"
      ? 15
      : undefined;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={
            "w-full  bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue hover:text-white"
          }
          type="submit"
        >
          Save to {title} list
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <p>You are using the {userPlan} tier.</p>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <ul className="list-disc pl-6">
              <li>
                You have only {slots} slots to add your {title}s.
              </li>
              <li>
                Currently, you are using {usedSlots} out of {slots} slots.
              </li>
              <li>
                Once you reach your limit, you won&rsquo;t be able to add more
                unless you upgrade your plan.
              </li>
              <li>
                Ensure you manage your {title}s efficiently to make the most of
                your available slots.
              </li>
              <li>
                You can always review or remove items from your list to free up
                slots.
              </li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-auto h-9 rounded-md px-3">
            Cancel
          </AlertDialogCancel>
          <Button
            type="submit"
            className={
              "w-auto h-9 rounded-md px-3 capitalize bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue hover:text-white"
            }
          >
            <p className="space-x-2">
              save {usedSlots + 1}/{slots}
            </p>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
