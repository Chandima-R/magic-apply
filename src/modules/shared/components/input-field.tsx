import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {RequiredIndicator} from "@/modules/shared/components/required-indicator";

interface Props{
    name: string;
    label: string;
    placeholder: string;
    control: any;
    required: boolean;
    labelColor?: string
}

export const InputField = ({name, placeholder, label, control, required, labelColor}: Props) => {
    return(
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={`capitalize gap-1 flex text-${labelColor ? labelColor : 'black'}`}>
                        {label}
                        {required && <RequiredIndicator />}
                    </FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} className={'h-12'}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
