import {Form} from "@/components/ui/form";
import {TextInput} from "@/modules/shared/components/text-input";
import {TextArea} from "@/modules/shared/components/text-area";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {CustomButton} from "@/modules/shared/components/custom-button";

const involvementSchema = z.object({
    organizationRole: z.string().nonempty('Project title is required.'),
    OrganizationName: z.string().nonempty('Organization is required.'),
    organizationRoleStartDate: z.string().nonempty('Start date is required.'),
    organizationRoleEndDate: z.string().nonempty('End date is required.'),
    organizationLocation: z.string().nonempty('Company Location is required.'),
    organizationRoleDescription: z.string().nonempty('Job description is required.'),
})
export const Involvements = () => {
    const form = useForm<z.infer<typeof involvementSchema>>({
        resolver: zodResolver(involvementSchema),
        defaultValues: {
            organizationRole: '',
            OrganizationName: '',
            organizationRoleStartDate: '',
            organizationRoleEndDate: '',
            organizationLocation: '',
            organizationRoleDescription: '',
        },
    })

    const onSubmit = (values: z.infer<typeof involvementSchema>) => {
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

                        <div className={'flex justify-end w-full mt-8'}>
                            <div className={'w-38'}>
                                <CustomButton
                                    type={'submit'}
                                    title={'Save to involvement list'}
                                />
                            </div>
                        </div>
                    </form>
                </Form>

            </div>
        </div>
    )
}
