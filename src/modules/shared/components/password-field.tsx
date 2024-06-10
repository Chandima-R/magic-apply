'use client'

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import {useState} from "react";
import { RequiredIndicator } from "./required-indicator";

interface Props{
    name: string;
    label: string;
    placeholder: string;
    control: any;
    required: boolean;
    labelColor?: string
}

export const PasswordField = ({name, placeholder, label, control, required, labelColor}: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                        <div style={{ position: "relative" }}>
                            <Input
                                placeholder={placeholder}
                                type={showPassword ? "text" : "password"}
                                {...field}
                                className={'h-12'}
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                }}
                                onClick={togglePasswordVisibility}
                            >
                            {showPassword ? (
                                <EyeIcon size={20} className={'text-gray-400'}/>
                            ) : (
                                <EyeOffIcon size={20} className={'text-gray-400'}/>
                            )}
                          </span>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
