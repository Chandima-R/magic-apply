import {Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {TextInput} from "@/modules/shared/components/text-input";
import {TextArea} from "@/modules/shared/components/text-area";
import {CustomButton} from "@/modules/shared/components/custom-button";

const experienceSchema = z.object({
    role: z.string().nonempty('Role is required.'),
    company: z.string().nonempty('Company is required.'),
    startDate: z.string().nonempty('Start date is required.'),
    endDate: z.string().nonempty('End date is required.'),
    companyLocation: z.string().nonempty('Company Location is required.'),
    jobDescription: z.string().nonempty('Job description is required.'),
})
export const Experience = () => {
    const form = useForm<z.infer<typeof experienceSchema>>({
        resolver: zodResolver(experienceSchema),
        defaultValues: {
            role: '',
            company: 'formData?.company',
            startDate: '',
            endDate: '',
            companyLocation: '',
            jobDescription: '',
        },
    })

    const onSubmit = (values: z.infer<typeof experienceSchema>) => {
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
            <div className={'w-full lg:w-2/3 px-2 lg:px-6  py-4 lg:py-0'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className={'gap-4 lg:gap-8 grid grid-cols-1 lg:grid-cols-2 w-full'}>
                            <TextInput
                                fieldLabel={'What was the your role at the company?'}
                                fieldName={'role'}
                                control={form.control}
                                placeholder={'Marketing Analyst'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'For which company did you work?'}
                                fieldName={'company'}
                                control={form.control}
                                placeholder={'Google'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'Start date'}
                                fieldName={'startDate'}
                                control={form.control}
                                placeholder={'start date'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'End date'}
                                fieldName={'endDate'}
                                control={form.control}
                                placeholder={'end date'}
                                required={true}
                            />
                            <TextInput
                                fieldLabel={'Where is the company located?'}
                                fieldName={'companyLocation'}
                                control={form.control}
                                placeholder={'New York, NY'}
                                required={true}
                            />
                        </div>
                        <div className={'mt-4 lg:mt-8 '}>
                            <TextArea fieldLabel={'What did you do at the company'}
                                      fieldName={'jobDescription'}
                                      control={form.control}
                                      placeholder={'Organized and implemented Google Analytics dta tracking campaigns to maximize the effectiveness of emil remarketing initiatives that were deployed using Salesforce&rsquo;s marketing cloud software. '}
                                      required={true}
                            />
                        </div>

                        <div className={'flex justify-end w-full mt-8'}>
                            <div className={'w-38'}>
                                <CustomButton
                                    type={'submit'}
                                    title={'Save to experience list'}
                                />
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
