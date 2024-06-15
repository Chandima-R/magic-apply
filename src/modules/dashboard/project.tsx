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
    projectTitle: z.string().nonempty('Project title is required.'),
    organization: z.string().nonempty('Organization is required.'),
    projectStartDate: z.string().nonempty('Start date is required.'),
    projectEndDate: z.string().nonempty('End date is required.'),
    projectUrl: z.string().nonempty('Company Location is required.'),
    projectDescription: z.string().nonempty('Job description is required.'),
})
export const Project = ({formData, setFormData, refSubmitButton, setIsButtonDisabled, setCurrentStep, refFormSaveButton}: Props) => {
    const form = useForm<z.infer<typeof resumeSchema>>({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            projectTitle: formData?.projectTitle,
            organization: formData?.organization,
            projectStartDate: formData?.projectStartDate,
            projectEndDate: formData?.projectEndDate,
            projectUrl: formData?.projectUrl,
            projectDescription: formData?.projectDescription,
        },
    })

    const onSubmit = (values: z.infer<typeof resumeSchema>) => {
        if (values) {
            setFormData({...formData, ...values})
            setCurrentStep('education')
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
                            <TextInput fieldLabel={'Give your project a title'} fieldName={'projectTitle'}
                                       control={form.control}
                                       placeholder={'Volunteer'} required={true}/>
                            <TextInput fieldLabel={'In which organization did you do your project?'} fieldName={'organization'}
                                       control={form.control}
                                       placeholder={'Habitat for Humanity'} required={true}/>
                            <TextInput fieldLabel={'Start date'} fieldName={'projectStartDate'} control={form.control}
                                       placeholder={'start date'} required={true}/>
                            <TextInput fieldLabel={'End date'} fieldName={'projectEndDate'} control={form.control}
                                       placeholder={'end date'} required={true}/>
                            <TextInput fieldLabel={'Project URL'} fieldName={'projectUrl'}
                                       control={form.control} placeholder={'New York, NY'}
                                       required={true}/>
                        </div>
                        <div className={'mt-4 lg:mt-8 '}>
                            <TextArea fieldLabel={'Now describe what you did'} fieldName={'projectDescription'}
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
                            onClick={() => setCurrentStep('experience')}
                        >
                            back
                        </button>
                    </form>
                </Form>

            </div>
        </div>
    )
}
