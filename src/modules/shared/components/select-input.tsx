"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequiredIndicator } from "@/modules/shared/components/required-indicator";

type SelectOptions = {
  label: string;
  value: string;
};

interface Props {
  fieldLabel: string;
  fieldName: string;
  control: any;
  placeholder: string;
  required?: boolean;
  fieldLabelColor?: string;
  description?: string;
  options: SelectOptions[];
}

export const SelectInput = ({
  control,
  description,
  placeholder,
  required,
  fieldName,
  fieldLabel,
  fieldLabelColor,
  options,
}: Props) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={`gap-1 flex text-${
              fieldLabelColor ? fieldLabelColor : "black"
            }`}
          >
            {fieldLabel}
            {required && <RequiredIndicator />}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className={"capitalize"}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className={"capitalize"}>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
