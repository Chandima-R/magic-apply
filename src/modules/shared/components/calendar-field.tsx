import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RequiredIndicator } from "@/modules/shared/components/required-indicator";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props {
  fieldName: string;
  fieldLabel: string;
  control: any;
  required: boolean;
}

export const CalendarField = ({
  fieldName,
  fieldLabel,
  control,
  required,
}: Props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className={cn("capitalize gap-1 flex")}>
            {fieldLabel}
            {required && <RequiredIndicator />}
          </FormLabel>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  onClick={() => setPopoverOpen(true)}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                value={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  setPopoverOpen(false);
                }}
                tileDisabled={({ date }) =>
                  date > new Date() || date < new Date("2000-01-01")
                }
              />
            </PopoverContent>
          </Popover>
          <FormMessage className={"text-xs"} />
        </FormItem>
      )}
    />
  );
};
