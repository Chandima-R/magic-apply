import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  ReactNode,
  JSXElementConstructor,
  ReactElement,
  ReactPortal,
} from "react";
import { RequiredIndicator } from "./required-indicator";

interface Props {
  fieldLabel: string;
  fieldName: string;
  placeholder: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  control: any;
  options: (
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | Promise<ReactNode | void>
    | null
    | undefined
  )[];
}

export const BubbleInputField = ({
  fieldLabel,
  fieldName,
  placeholder,
  control,
  options,
  inputValue,
  onChange,
  onRemove,
}: Props) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldLabel}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              value={inputValue}
              onChange={onChange}
            />
          </FormControl>

          <div className="flex items-center">
            <p className="text-xs mr-0.5">
              Press comma (,) after inserting a value.
            </p>
            <RequiredIndicator />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {options.map((option: any, index) => (
              <div
                key={index}
                className="text-sm items-center flex cursor-pointer font-normal rounded-full capitalize text-black bg-slate-200/40 px-4 py-1.5 hover:bg-slate-400/40 shadow-sm"
              >
                <span>{option}</span>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="ml-2 text-red-400"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
