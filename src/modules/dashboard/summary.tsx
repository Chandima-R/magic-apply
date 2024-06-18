import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TextArea} from "@/modules/shared/components/text-area";
import {Form} from "@/components/ui/form";
import {CustomButton} from "@/modules/shared/components/custom-button";

const summarySchema = z.object({
    summary: z.string().nonempty('Summary is required.'),
})

export const Summary = () => {
    const form = useForm<z.infer<typeof summarySchema>>({
        resolver: zodResolver(summarySchema),
        defaultValues: {
            summary: ''
        },
    })

    const onSubmit = (values: z.infer<typeof summarySchema>) => {
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
                            <TextArea
                                fieldLabel={'Write a professional summary'}
                                fieldName={'summary'}
                                control={form.control}
                                placeholder={'Experienced in global early-stage executive with economics and mathematics degree from the University ow Wisconsin. Passion for building inspiring companies people love through industry-leading design, development, branding and making big bets.'}
                                required={true}
                            />
                        </div>

                        <div className={'flex justify-end w-full mt-8'}>
                            <div className={'w-38'}>
                                <CustomButton
                                    type={'submit'}
                                    title={'Save summary info'}
                                />
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
