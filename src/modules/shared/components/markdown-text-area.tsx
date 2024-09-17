import React from "react";
import MDEditor from "@uiw/react-md-editor";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RequiredIndicator } from "@/modules/shared/components/required-indicator";

interface Props {
  fieldLabel: string;
  fieldName: string;
  control: any;
  placeholder: string;
  required: boolean;
  fieldLabelColor?: string;
  description?: string;
}

export const MarkdownTextArea = ({
  control,
  description,
  placeholder,
  required,
  fieldName,
  fieldLabel,
  fieldLabelColor,
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
          <FormControl>
            <div data-color-mode="light" className="w-full">
              <MDEditor
                value={field.value}
                onChange={(value) => field.onChange(value)}
                preview="edit"
                // placeholder={placeholder}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
