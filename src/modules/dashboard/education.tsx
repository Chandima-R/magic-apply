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
    degree: z.string().nonempty('Degree or major required.'),
    institute: z.string().nonempty('Institute is required.'),
    instituteLocation: z.string().nonempty('Location of the institute is required.'),
    completionDate: z.string().nonempty('Completion date is required.'),
    minorDegree: z.string().nonempty('Any minor is required.'),
    gpa: z.string().nonempty('GPA is required.'),
    additionalInformation: z.string().nonempty('Additional information is required.'),
})
export const Education = ({
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
            degree: formData?.degree,
            institute: formData?.institute,
            instituteLocation: formData?.instituteLocation,
            completionDate: formData?.completionDate,
            minorDegree: formData?.minorDegree,
            gpa: formData?.gpa,
            additionalInformation: formData?.additionalInformation,
        },
    })

    const onSubmit = (values: z.infer<typeof resumeSchema>) => {
        if (values) {
            setFormData({...formData, ...values})
            setCurrentStep('certifications')
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
            <div className={'w-full lg:w-2/3 px-2 lg:px-6 py-4 lg:py-0'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                        <div className={'gap-4 lg:gap-8 grid grid-cols-1 w-full'}>
                            <TextInput
                                fieldLabel={'What is your degree or other qualification and major?'}
                                fieldName={'degree'}
                                control={form.control}
                                placeholder={'Bachelor of Science in Economics'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'Where did you earn your degree / qualification?'}
                                fieldName={'institute'}
                                control={form.control}
                                placeholder={'University of Wisconsin, Madison'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'Where is the institute located?'}
                                fieldName={'instituteLocation'}
                                control={form.control}
                                placeholder={'Madison, WI'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'When did you earn our degree/ qualification?'}
                                fieldName={'completionDate'}
                                control={form.control}
                                placeholder={'2024'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'Di you minor in anything?'}
                                fieldName={'minorDegree'}
                                control={form.control}
                                placeholder={'Did you minor in anything?'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'GPA (If applicable)'}
                                fieldName={'gpa'}
                                control={form.control}
                                placeholder={'3.28'}
                                required={true}
                            />
                            <TextArea
                                fieldLabel={'Open field for additional information'}
                                fieldName={'additionalInformation'}
                                control={form.control}
                                placeholder={'Awarded full scholarship for 4 years due to grades.'}
                                required={true}
                            />
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
                            onClick={() => setCurrentStep('project')}
                        >
                            back
                        </button>
                    </form>
                </Form>

            </div>
        </div>
    )
}
