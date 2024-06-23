import {Form} from "@/components/ui/form";
import {TextInput} from "@/modules/shared/components/text-input";
import {TextArea} from "@/modules/shared/components/text-area";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {CustomButton} from "@/modules/shared/components/custom-button";


const courseworkSchema = z.object({
    courseName: z.string().nonempty('Certificate name is required.'),
    courseInstitute: z.string().nonempty('Certificate issued institute is required.'),
    courseCompletionDate: z.string().nonempty('Certificate issued date is required.'),
    courseSkill: z.string(),
    courseDescription: z.string(),
})
export const Coursework = () => {
    const form = useForm<z.infer<typeof courseworkSchema>>({
        resolver: zodResolver(courseworkSchema),
        defaultValues: {
            courseName: '',
            courseInstitute: '',
            courseCompletionDate: '',
            courseSkill: '',
            courseDescription: '',
        },
    })

    const onSubmit = (values: z.infer<typeof courseworkSchema>) => {
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
                                required={false}
                            />
                            <TextArea
                                fieldLabel={'How was that skill applied?'}
                                fieldName={'courseDescription'}
                                control={form.control}
                                placeholder={'Coordinating on code with a small group of people.'}
                                required={false}
                            />
                        </div>

                        <div className={'flex justify-end w-full mt-8'}>
                            <div className={'w-38'}>
                                <CustomButton
                                    type={'submit'}
                                    title={'Save to coursework list'}
                                />
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
