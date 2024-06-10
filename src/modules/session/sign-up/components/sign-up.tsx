'use client'

import {CustomSocialLoginButton} from "@/modules/shared/components/custom-social-login-button";
import {Seperator} from "@/modules/shared/components/seperator";
import {InputField} from "@/modules/shared/components/input-field";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {PasswordField} from "@/modules/shared/components/password-field";
import {Form} from "@/components/ui/form";
import {CustomButton} from "@/modules/shared/components/custom-button";
import Link from "next/link";
import {SessionHeader} from "@/modules/shared/components/session-header";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Firstname and lastname is required",
    }).email(),
    email: z.string().min(2, {
        message: "Email is required",
    }).email(),
    confirmationEmail: z.string().min(2, {
        message: "Confirm email is required",
    }).email(),
    password: z.string().min(2, {
        message: "Password is required",
    }),
    confirmationPassword: z.string().min(2, {
        message: "Confirm password is required",
    }),
})

export const SignUp = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            confirmationEmail: "",
            password: "",
            confirmationPassword: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className={'w-full max-w-screen mx-auto h-screen flex justify-center scroll-auto'}>
            <div
                className="w-full lg:w-1/3 flex flex-col items-center justify-center py-28 max-w-[500px] px-14 lg:px-16 mx-auto">
                <h1 className={'font-bold text-4xl lg:text-6xl mb-12 text-slate-700'}>MagicApply</h1>
                <div className={'flex items-center gap-4 mb-4 lg:px-10'}>
                    <CustomSocialLoginButton icon={'/images/facebook.png'} title={'facebook'} customFn={() => {
                    }}/>
                    <CustomSocialLoginButton icon={'/images/google.png'} title={'google'} customFn={() => {
                    }}/>
                </div>

                <Seperator/>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
                        <InputField name={'name'} label={''} placeholder={'Your firstname and lastname'}
                                    control={form.control}
                                    required={false}/>
                        <InputField name={'email'} label={''} placeholder={'Your email'} control={form.control}
                                    required={false}/>
                        <InputField name={'confirmationEmail'} label={''} placeholder={'Confirm email'}
                                    control={form.control}
                                    required={false}/>
                        <PasswordField name={'password'} label={''} placeholder={'Your password'}
                                       control={form.control}
                                       required={false}
                        />
                        <PasswordField name={'confirmationPassword'} label={''} placeholder={'Confirm password'}
                                       control={form.control}
                                       required={false}
                        />
                        <div className={'pt-8'}>
                            <CustomButton title={'Create account'} onSubmit={() => {
                            }} type={'submit'}/>
                        </div>
                    </form>
                </Form>

                <div className={'w-full flex justify-center my-12'}>
                    <Link href={'/sign-in'}>Already have an account? <span
                        className={'text-honoluluBlue font-semibold'}> Sign In</span></Link>
                </div>
            </div>
            <SessionHeader />

        </div>
    )
}
