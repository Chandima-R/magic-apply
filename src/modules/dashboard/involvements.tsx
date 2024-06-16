import {RegisterData} from "@/modules/dashboard/initialData";
import {Dispatch, RefObject, SetStateAction} from "react";
import {Form} from "@/components/ui/form";
import {TextInput} from "@/modules/shared/components/text-input";
import {TextArea} from "@/modules/shared/components/text-area";
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
    organizationRole: z.string().nonempty('Project title is required.'),
    OrganizationName: z.string().nonempty('Organization is required.'),
    organizationRoleStartDate: z.string().nonempty('Start date is required.'),
    organizationRoleEndDate: z.string().nonempty('End date is required.'),
    organizationLocation: z.string().nonempty('Company Location is required.'),
    organizationRoleDescription: z.string().nonempty('Job description is required.'),
})
export const Involvements = ({
                                 formData,
                                 setFormData,
                                 refSubmitButton,
                                 setIsButtonDisabled,
                                 setCurrentStep,
                                 refFormSaveButton
                             }: Props) => {
    const form = useForm<z.infer<typeof resumeSchema>>({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            organizationRole: formData?.organizationRole,
            OrganizationName: formData?.OrganizationName,
            organizationRoleStartDate: formData?.organizationRoleStartDate,
            organizationRoleEndDate: formData?.organizationRoleEndDate,
            organizationLocation: formData?.organizationLocation,
            organizationRoleDescription: formData?.organizationRoleDescription,
        },
    })

    const onSubmit = (values: z.infer<typeof resumeSchema>) => {
        if (values) {
            setFormData({...formData, ...values})
            setCurrentStep('skills')
        }
    }

    return (
        <div className={'w-full flex flex-col lg:flex-row'}>
            <div className={'w-full lg:w-1/3'}>
                <div className={'rounded-sm overflow-hidden shadow'}>
                    <video className={'w-full object-cover h-auto'} controls>
                        <source src={'/video/resume-builder.mp4'}/>
                    </video>
                </div>
            </div>
            <div className={'w-full lg:w-2/3 px-2 lg:px-6  py-4 lg:py-0'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                        <div className={'gap-4 lg:gap-8 grid grid-cols-1 lg:grid-cols-2 w-full'}>
                            <TextInput
                                fieldLabel={'What was your role at the organization?'}
                                fieldName={'organizationRole'}
                                control={form.control}
                                placeholder={'Selected Member'}
                                required={true}/>
                            <TextInput
                                fieldLabel={'For which organization did you work?'}
                                fieldName={'OrganizationName'}
                                control={form.control}
                                placeholder={'Economics Student Association'}
                                required={true}/>
                            <TextInput
                                fieldLabel={'Start date'}
                                fieldName={'organizationRoleStartDate'}
                                control={form.control}
                                placeholder={'start date'}
                                required={true}/>
                            <TextInput
                                fieldLabel={'End date'}
                                fieldName={'organizationRoleEndDate'}
                                control={form.control}
                                placeholder={'end date'}
                                required={true}/>
                            <TextInput
                                fieldLabel={'At which college was the organization located?'}
                                fieldName={'organizationLocation'}
                                control={form.control}
                                placeholder={'University of Wisconsin, Madison'}
                                required={true}/>
                        </div>
                        <div className={'mt-4 lg:mt-8 '}>
                            <TextArea
                                fieldLabel={'What did you do at the organization?'}
                                fieldName={'organizationRoleDescription'}
                                control={form.control}
                                placeholder={'Participated in forums and discussions presented by key economic thinkers and companies associated with the uniiversity.'}
                                required={true}/>

                        </div>

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
                            onClick={() => setCurrentStep('coursework')}
                        >
                            back
                        </button>
                    </form>
                </Form>

            </div>
        </div>
    )
}
