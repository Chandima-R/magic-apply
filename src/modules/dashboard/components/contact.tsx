'use client'

import {Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {TextInput} from "@/modules/shared/components/text-input";
import {CustomButton} from "@/modules/shared/components/custom-button";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {useMutation} from "@apollo/client";
import {ADD_NEW_CONTACT} from "@/graphql/contact";
import {LoadingButton} from "@/modules/shared/loading-button";
import {useUser} from "@clerk/nextjs";

const contactSchema = z.object({
    fullName: z.string().nonempty('Full name is required.'),
    email: z.string().nonempty('Email address is required.').email(),
    phone: z.string().nonempty('Phone number is required.'),
    linkedin: z.string().nonempty('Linkedin is required.'),
    personalWebsite: z.string(),
    country: z.string().nonempty('Country is required.'),
    state: z.string(),
    city: z.string().nonempty('City is required.'),
})

export const Contact = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {toast} = useToast();
    const {user} = useUser();
    console.log(user?.id)

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            linkedin: "",
            personalWebsite: "",
            country: "",
            state: "",
            city: "",
        },
    });

    const [addContact] = useMutation(ADD_NEW_CONTACT);

    async function onSubmit(values: z.infer<typeof contactSchema>) {
        try {
            setIsLoading(true);
            await addContact({
                variables: {
                    contact_city: values.city,
                    contact_country: values.country,
                    contact_email: values.email,
                    contact_linkedin: values.linkedin,
                    contact_name: values.fullName,
                    contact_phone: values.phone,
                    contact_state: values.state,
                    contact_website: values.personalWebsite,
                    user_id: user?.id,
                },
            });
            toast({
                variant: "default",
                title: "Success.",
                description: "Your item was added.",
            });
            form.reset();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={'gap-4 lg:gap-8 grid grid-cols-1 lg:grid-cols-2 w-full'}>
                    <TextInput
                        fieldLabel={'full name'}
                        fieldName={'fullName'}
                        control={form.control}
                        placeholder={'Charles Bloomberg'} required={true}/>
                    <TextInput
                        fieldLabel={'Email address'}
                        fieldName={'email'}
                        control={form.control}
                        placeholder={'charlesbloomberg@wisc.edu'}
                        required={true}
                    />
                    <TextInput
                        fieldLabel={'Phone number'}
                        fieldName={'phone'}
                        control={form.control}
                        placeholder={'(621) 7999 5548'}
                        required={true}
                    />
                    <TextInput
                        fieldLabel={'LinkedIn'}
                        fieldName={'linkedin'}
                        control={form.control}
                        placeholder={'in/cbloomberg'}
                        required={true}
                    />
                    <TextInput
                        fieldLabel={'Personal Website'}
                        fieldName={'personalWebsite'}
                        control={form.control}
                        placeholder={'https://www.chaarlesbloomberg.com'}
                        required={false}
                    />
                    <TextInput
                        fieldLabel={'Country'}
                        fieldName={'country'}
                        control={form.control}
                        placeholder={'country'}
                        required={true}
                    />
                    <TextInput
                        fieldLabel={'State'}
                        fieldName={'state'}
                        control={form.control}
                        placeholder={'state'}
                        required={false}
                    />
                    <TextInput
                        fieldLabel={'City'}
                        fieldName={'city'}
                        control={form.control}
                        placeholder={'city'}
                        required={true}
                    />
                </div>

                <div className={'flex justify-end w-full mt-8'}>
                    <div className={'w-38'}>
                        {
                            isLoading ? (
                                <LoadingButton/>
                            ) : (
                                <CustomButton
                                    type={'submit'}
                                    title={'Save basic info'}
                                />
                            )
                        }
                    </div>
                </div>
            </form>
        </Form>
    );
};
