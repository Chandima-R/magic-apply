import {Form} from "@/components/ui/form";
import {TextInput} from "@/modules/shared/components/text-input";
import {TextArea} from "@/modules/shared/components/text-area";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {CustomButton} from "@/modules/shared/components/custom-button";


const certificationSchema = z.object({
    certificateName: z.string().nonempty('Certificate name is required.'),
    certificateInstitute: z.string().nonempty('Certificate issued institute is required.'),
    certificateDate: z.string().nonempty('Certificate issued date is required.'),
    certificateDescription: z.string().nonempty('Certificate description date is required.'),
})
export const Certifications = () => {
    const form = useForm<z.infer<typeof certificationSchema>>({
        resolver: zodResolver(certificationSchema),
        defaultValues: {
            certificateName: '',
            certificateInstitute: '',
            certificateDate: '',
            certificateDescription: '',
        },
    })

    const onSubmit = (values: z.infer<typeof certificationSchema>) => {
        if (values) {
            console.log(values)
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

                        <div className={'flex justify-end w-full mt-8'}>
                            <div className={'w-38'}>
                                <CustomButton
                                    type={'submit'}
                                    title={'Save to certifications list'}
                                />
                            </div>
                        </div>
                    </form>
                </Form>

            </div>
        </div>
    )
}
