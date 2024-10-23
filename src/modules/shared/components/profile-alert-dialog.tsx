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
import {
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRightCircle,
  X,
  Crown,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Props {
  sectionName: string;
  planName: string;
  usedSlots: number;
  disabled: boolean;
  onConfirm: () => void;
}

export const ProfileAlertDialog = ({
  disabled,
  onConfirm,
  planName,
  sectionName,
  usedSlots,
}: Props) => {
  const [open, setOpen] = useState(false);

  let totalSlots: number = 0;

  if (planName?.toLowerCase() === "free") {
    totalSlots = 5;
  } else if (planName?.toLowerCase() === "basic") {
    totalSlots = 10;
  } else if (planName?.toLowerCase() === "premium") {
    return (
      <AlertDialog open={true} onOpenChange={() => {}}>
        <AlertDialogContent className="max-w-lg p-6 rounded-lg shadow-lg bg-white">
          <AlertDialogHeader className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <h2 className="font-bold text-xl">Manage Your {sectionName}</h2>
              <Badge
                variant="outline"
                className="bg-blue-100 text-blue-800 capitalize"
              >
                {planName} Plan
              </Badge>
            </div>
            <AlertDialogDescription className="mt-2 text-sm text-gray-500">
              You are currently using the{" "}
              <strong className="capitalize">{planName}</strong> plan.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col items-start p-4">
            <CheckCircle className="text-green-500" size={30} />
            <h3 className="font-bold text-lg text-green-700">
              You have unlimited slots!
            </h3>
            <p className="text-sm text-green-600">
              Feel free to add as many achievements as you want.
            </p>
          </div>

          <AlertDialogFooter className="flex flex-col items-center space-y-3 mt-6">
            <AlertDialogCancel className="btn-secondary absolute rounded-full h-10 w-10 top-2 right-2 p-0">
              <X className="size-4" />
            </AlertDialogCancel>
            <Button
              onClick={onConfirm}
              className="w-full uppercase bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue"
            >
              Add More {sectionName}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  if (planName?.toLowerCase() === "free") {
    totalSlots = 5;
  } else if (planName?.toLowerCase() === "basic") {
    totalSlots = 10;
  } else {
    console.error("Invalid plan name");
  }

  const getProgressPercentage = (totalSlots: number, usedSlots: number) =>
    (usedSlots / totalSlots) * 100;

  const availableSlots = totalSlots - usedSlots;
  const progressPercentage = getProgressPercentage(totalSlots, usedSlots);

  const renderSlotInfo = () => {
    return (
      <div className="space-y-4">
        {/* Slot usage message */}
        <div className="flex items-start space-x-4 p-4 bg-green-100 rounded-md shadow-sm">
          <CheckCircle className="text-green-500" size={30} />
          <div>
            <h3 className="font-bold text-lg text-green-700">
              You&rsquo;re doing great!
            </h3>
            <p className="text-sm text-green-600">
              You have <strong>{availableSlots}</strong> slots left for{" "}
              <strong>{sectionName}</strong>. Make sure to fill them with your
              achievements.
            </p>
            <div className="mt-3">
              <Progress value={progressPercentage} className="w-full h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {usedSlots} out of {totalSlots} slots used.
              </p>
            </div>
          </div>
        </div>

        {(planName?.toLowerCase() === "free" ||
          planName?.toLowerCase() === "basic") && (
          <div className="flex items-center space-x-2 p-4 bg-yellow-100 rounded-md shadow-sm">
            <Info className="text-blue-500" size={24} />
            <span className="text-sm text-blue-600">
              Upgrade to the <strong>Premium</strong> plan to add more{" "}
              {sectionName} or keep all of your current {sectionName}s.
            </span>
          </div>
        )}

        <div className="flex items-center justify-end w-full">
          {(planName?.toLowerCase() === "free" ||
            planName?.toLowerCase() === "basic") && (
            <Button variant="outline" size="sm" className="mt-2">
              <Crown className="mr-2 text-yellow-400" size={16} /> Upgrade to
              Premium
            </Button>
          )}
        </div>
      </div>
    );
  };

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
          className="w-full uppercase bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue"
        >
          <span>Save to {sectionName} list</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-lg p-6 rounded-lg shadow-lg bg-white">
        <AlertDialogHeader className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <h2 className="font-bold text-xl">Manage Your {sectionName}</h2>
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 capitalize"
            >
              {planName} Plan
            </Badge>
          </div>
          <AlertDialogDescription className="mt-2 text-sm text-gray-500">
            You are currently using the{" "}
            <strong className="capitalize">{planName}</strong> plan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-4">{renderSlotInfo()}</div>

        <AlertDialogFooter className="flex flex-col items-center space-y-3 mt-6">
          <AlertDialogCancel className="btn-secondary absolute rounded-full h-10 w-10 top-2 right-2 p-0">
            <X className="size-4" />
          </AlertDialogCancel>

          {availableSlots > 0 ? (
            <Button
              onClick={handleConfirm}
              className="w-full uppercase bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue"
            >
              Add More {sectionName}
            </Button>
          ) : (
            <Button className="w-full uppercase bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue">
              Upgrade Plan
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
