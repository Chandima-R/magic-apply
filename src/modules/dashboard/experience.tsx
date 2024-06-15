import {RegisterData} from "@/modules/dashboard/initialData";
import {Dispatch, RefObject, SetStateAction} from "react";
import {Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {TextInput} from "@/modules/shared/components/text-input";
import {TextArea} from "@/modules/shared/components/text-area";

interface Props {
    formData: RegisterData;
    setFormData: Dispatch<SetStateAction<RegisterData>>;
    refSubmitButton: RefObject<HTMLButtonElement> | null;
    setIsButtonDisabled: (data: boolean) => void;
    setCurrentStep: Dispatch<SetStateAction<string>>
    refFormSaveButton: RefObject<HTMLButtonElement> | null;
}

const resumeSchema = z.object({
    role: z.string().nonempty('Role is required.'),
    company: z.string().nonempty('Company is required.'),
    startDate: z.string().nonempty('Start date is required.'),
    endDate: z.string().nonempty('End date is required.'),
    companyLocation: z.string().nonempty('Company Location is required.'),
    jobDescription: z.string().nonempty('Job description is required.'),
})
export const Experience = ({
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
            role: formData?.role,
            company: formData?.company,
            startDate: formData?.startDate,
            endDate: formData?.endDate,
            companyLocation: formData?.companyLocation,
            jobDescription: formData?.jobDescription,
        },
    })

    const onSubmit = (values: z.infer<typeof resumeSchema>) => {
        if (values) {
            setFormData({...formData, ...values})
            setCurrentStep('project')
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
                            <TextInput fieldLabel={'What was the your role at the company?'} fieldName={'role'}
                                       control={form.control}
                                       placeholder={'Marketing Analyst'} required={true}/>
                            <TextInput fieldLabel={'For which company did you work?'} fieldName={'company'}
                                       control={form.control}
                                       placeholder={'Google'} required={true}/>
                            <TextInput fieldLabel={'Start date'} fieldName={'startDate'} control={form.control}
                                       placeholder={'start date'} required={true}/>
                            <TextInput fieldLabel={'End date'} fieldName={'endDate'} control={form.control}
                                       placeholder={'end date'} required={true}/>
                            <TextInput fieldLabel={'Where is the company located?'} fieldName={'companyLocation'}
                                       control={form.control} placeholder={'New York, NY'}
                                       required={true}/>
                        </div>
                        <div className={'mt-4 lg:mt-8 '}>
                            <TextArea fieldLabel={'What did you do at the company'} fieldName={'jobDescription'}
                                      control={form.control}
                                      placeholder={'Organized and implemented Google Analytics dta tracking campaigns to maximize the effectiveness of emil remarketing initiatives that were deployed using Salesforce&rsquo;s marketing cloud software. '}
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
                            onClick={() => setCurrentStep('contact')}
                        >
                            back
                        </button>
                    </form>
                </Form>

            </div>
        </div>
    )
}
