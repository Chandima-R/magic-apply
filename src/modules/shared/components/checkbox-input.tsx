import { Checkbox } from "@/components/ui/checkbox";
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
  required?: boolean;
  fieldLabelColor?: string;
  description?: string;
}
export const CheckboxField = ({
  control,
  description,
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
        <FormItem className="flex items-center gap-2">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="mt-2"
            />
          </FormControl>
          <FormLabel
            className={`gap-1 flex text-${
              fieldLabelColor ? fieldLabelColor : "black"
            }`}
          >
            {fieldLabel}
            {required && <RequiredIndicator />}
          </FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
