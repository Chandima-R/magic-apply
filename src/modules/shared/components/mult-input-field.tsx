import React, { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RequiredIndicator } from "@/modules/shared/components/required-indicator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  fieldLabel: string;
  fieldName: string;
  control: any;
  required?: boolean;
  description?: string;
}

export const MultiInputField = ({
  control,
  description,
  required,
  fieldName,
  fieldLabel,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "master_resume"
  );

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {fieldLabel && (
            <FormLabel className="gap-1 flex text-black">
              {fieldLabel}
              {required && <RequiredIndicator />}
            </FormLabel>
          )}
          <FormControl className="flex-grow">
            <div className="flex items-center group h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50">
              <div className="w-3/5">
                {selectedOption === "upload" && (
                  <Input
                    type="file"
                    className="border-none h-auto p-0 pl-3 focus:ring-0 focus:outline-none focus:border-none"
                  />
                )}
                {selectedOption === "master_resume" && (
                  <div className="flex items-center border-none h-auto p-0 pl-3">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span className="ml-2">Use master resume</span>
                  </div>
                )}
                {selectedOption === "custom_text" && (
                  <Input
                    placeholder="Insert a custom text"
                    {...field}
                    className="focus-visible:border-transparent focus-visible:ring-0 focus:outline-none focus:ring-transparent focus:ring-0 focus:border-transparent h-8 gap-2 border-transparent rounded-none py-0 ring-offset-0 focus-within:ring-0 focus-within:ring-transparent focus-within:ring-offset-2"
                  />
                )}
              </div>

              <Select
                onValueChange={(value) => setSelectedOption(value)}
                defaultValue="master_resume"
              >
                <SelectTrigger className="focus:outline-none focus:ring-white focus:ring-0 focus:border-l h-8 w-2/5 gap-2 border-l border-r-0 border-t-0 border-b-0 rounded-none py-0 ring-offset-0 focus-within:ring-0 focus-within:ring-transparent focus-within:ring-offset-2">
                  <SelectValue placeholder="Select an input type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="upload">Upload a file</SelectItem>
                    <SelectItem value="master_resume">
                      Use master resume
                    </SelectItem>
                    <SelectItem value="custom_text">Use custom text</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
