import {Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {TextInput} from "@/modules/shared/components/text-input";
import {CustomButton} from "@/modules/shared/components/custom-button";

const contactSchema = z.object({
    fullName: z.string().nonempty('Full name is required.'),
    email: z.string().nonempty('Email address is required.').email(),
    phone: z.string().nonempty('Phone number is required.'),
    linkedin: z.string().nonempty('Linkedin is required.'),
    personalWebsite: z.string().nonempty('Personal website name is required.'),
    country: z.string().nonempty('Country is required.'),
    state: z.string().nonempty('State is required.'),
    city: z.string().nonempty('City is required.'),
})

export const Contact = () => {
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
    })

    const onSubmit = (values: z.infer<typeof contactSchema>) => {
        if (values) {
            console.log(values)
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
                        required={true}
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
                        required={true}
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
                        <CustomButton
                            type={'submit'}
                            title={'Save basic info'}
                        />
                    </div>
                </div>
            </form>
        </Form>
    )
}
