import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {RequiredIndicator} from "@/modules/shared/components/required-indicator";
import {Textarea} from "@/components/ui/textarea";

interface Props{
    fieldLabel: string;
    fieldName: string;
    control: any;
    placeholder: string;
    required: boolean;
    fieldLabelColor?: string;
    description?: string;
}
export const TextArea = ({
                              control,
                              description,
                              placeholder,
                              required,
                              fieldName,
                              fieldLabel,
                              fieldLabelColor
                          }: Props) => {
    return(
        <FormField
            control={control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={`capitalize gap-1 flex text-${fieldLabelColor ? fieldLabelColor : 'black'}`}>
                        {fieldLabel}
                        {required && <RequiredIndicator />}
                    </FormLabel>
                    <FormControl>
                        <Textarea placeholder={placeholder} {...field} />
                    </FormControl>
                    {
                        description && (
                            <FormDescription>
                                {description}
                            </FormDescription>
                        )
                    }
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
