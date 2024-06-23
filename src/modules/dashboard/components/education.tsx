import {Form} from "@/components/ui/form";
import {TextInput} from "@/modules/shared/components/text-input";
import {TextArea} from "@/modules/shared/components/text-area";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {CustomButton} from "@/modules/shared/components/custom-button";


const educationSchema = z.object({
    degree: z.string().nonempty('Degree or major required.'),
    institute: z.string().nonempty('Institute is required.'),
    instituteLocation: z.string().nonempty('Location of the institute is required.'),
    completionDate: z.string().nonempty('Completion date is required.'),
    minorDegree: z.string().nonempty('Any minor is required.'),
    gpa: z.string(),
    additionalInformation: z.string()
})
export const Education = () => {
    const form = useForm<z.infer<typeof educationSchema>>({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            degree: '',
            institute: '',
            instituteLocation: '',
            completionDate: '',
            minorDegree: '',
            gpa: '',
            additionalInformation: '',
        },
    })

    const onSubmit = (values: z.infer<typeof educationSchema>) => {
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
                                required={false}
                            />
                            <TextArea
                                fieldLabel={'Open field for additional information'}
                                fieldName={'additionalInformation'}
                                control={form.control}
                                placeholder={'Awarded full scholarship for 4 years due to grades.'}
                                required={false}
                            />
                        </div>

                        <div className={'flex justify-end w-full mt-8'}>
                            <div className={'w-38'}>
                                <CustomButton
                                    type={'submit'}
                                    title={'Save to education list'}
                                />
                            </div>
                        </div>
                    </form>
                </Form>

            </div>
        </div>
    )
}
