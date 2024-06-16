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
    courseName: z.string().nonempty('Certificate name is required.'),
    courseInstitute: z.string().nonempty('Certificate issued institute is required.'),
    courseCompletionDate: z.string().nonempty('Certificate issued date is required.'),
    courseSkill: z.string().nonempty('Certificate issued date is required.'),
    courseDescription: z.string().nonempty('Certificate description date is required.'),
})
export const Coursework = ({formData, setFormData, refSubmitButton, setIsButtonDisabled, setCurrentStep, refFormSaveButton}: Props) => {
    const form = useForm<z.infer<typeof resumeSchema>>({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            courseName: formData?.courseName,
            courseInstitute: formData?.courseInstitute,
            courseCompletionDate: formData?.courseCompletionDate,
            courseSkill: formData?.courseSkill,
            courseDescription: formData?.courseDescription,
        },
    })

    const onSubmit = (values: z.infer<typeof resumeSchema>) => {
        if (values) {
            setFormData({...formData, ...values})
            setCurrentStep('involvements')
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
                                fieldLabel={'What was the course name?'}
                                fieldName={'courseName'}
                                control={form.control}
                                placeholder={'Introduction to Computer Science'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'Where did you take the course?'}
                                fieldName={'courseInstitute'}
                                control={form.control}
                                placeholder={'University of Wisconsin, Madison'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'When did you take the course?'}
                                fieldName={'courseCompletionDate'}
                                control={form.control}
                                placeholder={'2024'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'When skill did you use?'}
                                fieldName={'courseSkill'}
                                control={form.control}
                                placeholder={'Teamwork'}
                                required={true}
                            />
                            <TextArea
                                fieldLabel={'How was that skill applied?'}
                                fieldName={'courseDescription'}
                                control={form.control}
                                placeholder={'Coordinating on code with a small group of people.'}
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
                            onClick={() => setCurrentStep('certifications')}
                        >
                            back
                        </button>
                    </form>
                </Form>

            </div>
        </div>
    )
}
