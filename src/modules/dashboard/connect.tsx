import {RegisterData} from "@/modules/dashboard/initialData";
import {Dispatch, RefObject, SetStateAction} from "react";
import {TextInput} from "@/modules/shared/components/text-input";
import {Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

interface Props {
    formData: RegisterData;
    setFormData: Dispatch<SetStateAction<RegisterData>>;
    refSubmitButton: RefObject<HTMLButtonElement> | null;
    setIsButtonDisabled: (data: boolean) => void;
    setCurrentStep: Dispatch<SetStateAction<string>>
    refFormSaveButton: RefObject<HTMLButtonElement> | null;
}

const resumeSchema = z.object({
    fullName: z.string().nonempty('Full name is required.'),
    email: z.string().nonempty('Full name is required.'),
    phone: z.string().nonempty('Full name is required.'),
    linkedin: z.string().nonempty('Full name is required.'),
    personalWebsite: z.string().nonempty('Full name is required.'),
    country: z.string().nonempty('Full name is required.'),
})

export const Connect = ({formData, setFormData, refSubmitButton, setIsButtonDisabled, setCurrentStep, refFormSaveButton}: Props) => {
    const form = useForm<z.infer<typeof resumeSchema>>({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            fullName: formData?.fullName,
            email: formData?.email,
            phone: formData?.phone,
            linkedin: formData?.linkedin,
            personalWebsite: formData?.personalWebsite,
            country: formData?.country,
        },
    })

    const onSubmit = (values: z.infer<typeof resumeSchema>) => {
        if(values){
            setFormData({...formData, ...values})
            setCurrentStep('connect')
        }
    }

    return(
        <Form {...form}>
            <p>connect</p>
            <form onSubmit={form.handleSubmit(onSubmit)} className={'gap-4 grid grid-cols-1 lg:grid-cols-2 w-full'}>
                <TextInput fieldLabel={'full name'} fieldName={'fullName'} control={form.control}
                           placeholder={'Charles Bloomberg'} required={true}/>
                <TextInput fieldLabel={'Email address'} fieldName={'email'} control={form.control}
                           placeholder={'charlesbloomberg@wisc.edu'} required={true}/>
                <TextInput fieldLabel={'Phone number'} fieldName={'phone'} control={form.control}
                           placeholder={'(621) 7999 5548'} required={true}/>
                <TextInput fieldLabel={'LinkedIn'} fieldName={'linkedin'} control={form.control}
                           placeholder={'in/cbloomberg'} required={true}/>
                <TextInput fieldLabel={'Personal Website'} fieldName={'personalWebsite'} control={form.control}
                           placeholder={'https://www.chaarlesbloomberg.com'} required={true}/>
                <TextInput fieldLabel={'Country'} fieldName={'country'} control={form.control} placeholder={'country'}
                           required={true}/>

                <button
                    type={'submit'}
                    ref={refSubmitButton}
                    className={'invisible'}
                >
                    submit
                </button>

                <button
                    type="button"
                    ref={refFormSaveButton}
                    className="invisible"
                    onClick={() => setCurrentStep('resume')}
                >
                    back
                </button>

            </form>
        </Form>
    )
}
