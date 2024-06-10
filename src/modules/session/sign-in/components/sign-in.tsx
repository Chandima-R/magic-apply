'use client'

import {SessionCounterCard} from "@/modules/shared/components/session-counter-card"
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
import {Button} from "@/components/ui/button";
import Image from "next/image";

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Email is required",
    }).email(),
    password: z.string().min(2, {
        message: "Password is required",
    }),
})

export const SignIn = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
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
                        <InputField name={'email'} label={''} placeholder={'Your email'} control={form.control}
                                    required={false}/>
                        <PasswordField name={'password'} label={''} placeholder={'Your password'}
                                       control={form.control}
                                       required={false}
                        />
                        <div className={'w-full flex justify-end'}>
                            <Link href={'/sign-up'} className={'text-honoluluBlue font-semibold'}>Forgot your
                                password?</Link>
                        </div>

                        <div className={'pt-8'}>
                            <CustomButton title={'sign in'} onSubmit={() => {
                            }} type={'submit'}/>
                        </div>
                    </form>
                </Form>

                <div className={'w-full flex justify-center my-12'}>
                    <Link href={'/sign-up'}>Don&rsquo;t have an account? <span
                        className={'text-honoluluBlue font-semibold'}> Sign Up</span></Link>
                </div>

            </div>
            <div
                className="hidden lg:flex w-2/3 flex-col items-center justify-center py-28 px-10 bg-slate-50 overflow-hidden">
                <h2 className={'font-bold text-xl lg:text-5xl mb-12 text-slate-700'}>Your AI Co-applicant</h2>
                <div className={'mb-4 w-4/5'}>
                    <div className={'mb-4'}>
                        <p className={'font-bold text-4xl mb-2 text-slate-700'}>
                            The way the world makes resumes.
                        </p>
                        <p className={'font-bold text-4xl mb-2 text-slate-700'}>
                            The smartest <span className={'text-honoluluBlue'}>AI resume builder.</span>
                        </p>
                    </div>
                    <p className={'text-slate-500 mb-4 text-lg'}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <Button className={'bg-honoluluBlue hover:bg-federalBlue h-12 px-8 font-semibold text-md h-10'}>
                        Get Started - It&rsquo; s free
                    </Button>
                </div>

                <div className={'mb-8 w-4/5'}>
                    <Image
                        src={'/images/banner.png'}
                        alt={'banner'}
                        width={1920}
                        height={1080}
                        className={'w-screen h-80 mt-8 object-cover'}
                    />
                </div>

                <div className="lg:flex items-center justify-between gap-4 h-auto py-auto w-4/5">
                    <SessionCounterCard title={'Total Users(this is annoying to update)'} count={'2,442,215'}/>
                    <SessionCounterCard title={'Interview Rate'} count={'62.18%'}/>
                    <SessionCounterCard title={'Avg. User Review'} count={'8.23/10'}/>
                </div>

            </div>
        </div>
    )
}
