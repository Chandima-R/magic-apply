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
    certificateName: z.string().nonempty('Certificate name is required.'),
    certificateInstitute: z.string().nonempty('Certificate issued institute is required.'),
    certificateDate: z.string().nonempty('Certificate issued date is required.'),
    certificateDescription: z.string().nonempty('Certificate description date is required.'),
})
export const Certifications = ({formData, setFormData, refSubmitButton, setIsButtonDisabled, setCurrentStep, refFormSaveButton}: Props) => {
    const form = useForm<z.infer<typeof resumeSchema>>({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            certificateName: formData?.certificateName,
            certificateInstitute: formData?.certificateInstitute,
            certificateDate: formData?.certificateDate,
            certificateDescription: formData?.certificateDescription,
        },
    })

    const onSubmit = (values: z.infer<typeof resumeSchema>) => {
        if (values) {
            setFormData({...formData, ...values})
            setCurrentStep('coursework')
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
                                fieldLabel={'What was the certificate name?'}
                                fieldName={'certificateName'}
                                control={form.control}
                                placeholder={'Project management professional(PMP)'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'Where did you get the certificate?'}
                                fieldName={'certificateInstitute'}
                                control={form.control}
                                placeholder={'Project management institute'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'When did you get the certificate?'}
                                fieldName={'certificateDate'}
                                control={form.control}
                                placeholder={'2024'}
                                required={true}
                            />
                            <TextArea
                                fieldLabel={'How is the certificate relevant?'}
                                fieldName={'certificateDescription'}
                                control={form.control}
                                placeholder={'Certified in a standardized and evolving set of project management principles..'}
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
                            onClick={() => setCurrentStep('education')}
                        >
                            back
                        </button>
                    </form>
                </Form>

            </div>
        </div>
    )
}
