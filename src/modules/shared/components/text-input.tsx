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

interface Props {
  fieldLabel?: string;
  fieldName: string;
  control: any;
  placeholder: string;
  required?: boolean;
  fieldLabelColor?: string;
  description?: string;
  disabled?: boolean;
}

export const TextInput = ({
  control,
  description,
  placeholder,
  required,
  fieldName,
  fieldLabel,
  fieldLabelColor,
  disabled,
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
            <Input placeholder={placeholder} {...field} disabled={disabled} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
