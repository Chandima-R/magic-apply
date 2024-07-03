'use client'

import React, { FC, ReactNode } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RequiredIndicator } from "@/modules/shared/components/required-indicator";
import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {TextArea} from "@/modules/shared/components/text-area";

const applyJobSchema = z.object({
    items: z.array(
        z.object({
            jobDescription: z.string().min(2, {
                message: "Job Description is required",
            }),
            masterResume: z.string().min(2, {
                message: "Master Resume is required",
            }),
            companyDescription: z.string().min(2, {
                message: "Company Description is required",
            }),
            additionalInfo: z.string().min(2, {
                message: "Additional Information is required",
            }),
            question1: z.string().min(2, {
                message: "Additional Question 1 is required",
            }),
            question2: z.string().min(2, {
                message: "Additional Question 2 is required",
            }),
            question3: z.string().min(2, {
                message: "Additional Question 3 is required",
            }),
            coverLetter: z.boolean(),
        })
    ),
});

interface ScrollBarProps {
    children: ReactNode;
}

const ScrollBar: FC<ScrollBarProps> = ({ children }) => (
    <div className="overflow-auto h-auto p-4 rounded">
        {children}
    </div>
);

export const ApplyJobs = () => {
    const form = useForm<z.infer<typeof applyJobSchema>>({
        resolver: zodResolver(applyJobSchema),
        defaultValues: {
            items: [{
                jobDescription: "",
                masterResume: "",
                companyDescription: "",
                additionalInfo: "",
                question1: "",
                question2: "",
                question3: "",
                coverLetter: false,
            }],
        },
    });

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const handleAddItem = () => {
        append({
            jobDescription: "",
            masterResume: "",
            companyDescription: "",
            additionalInfo: "",
            question1: "",
            question2: "",
            question3: "",
            coverLetter: false,
        });
    };

    const handleDeleteItem = (index: number) => {
        remove(index);
    };

    const onSubmit = (data: z.infer<typeof applyJobSchema>) => {
        console.log("Form Data: ", data);
    };

    return (
        <div>
            <div className={'mb-8'}>
                <p className={'text-2xl font-semibold'}>Apply Jobs</p>
            </div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ScrollBar>
                        {fields.map((item, index) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-9 gap-4 items-center"
                            >
                                <FormField
                                    control={control}
                                    name={`items[${index}].jobDescription`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Job Description (Paste or Link) <RequiredIndicator />
                                            </FormLabel>
                                            <FormControl>
                                                <TextArea fieldLabel={""} fieldName={""} control={undefined}
                                                          required={false}
                                                          placeholder="Paste the JD (or link of JD here)" {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.items?.[index]?.jobDescription?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`items[${index}].masterResume`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Master Resume Or Manual (Input or Paste) <RequiredIndicator />
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Keep black if master resume is up to date" {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.items?.[index]?.masterResume?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`items[${index}].companyDescription`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Description of the Company <RequiredIndicator />
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Describe in few sentences or paste the link of home page" {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.items?.[index]?.companyDescription?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`items[${index}].additionalInfo`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Additional Information (Highlight any recent projects or experience) <RequiredIndicator />
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Describe if any" {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.items?.[index]?.additionalInfo?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`items[${index}].question1`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Additional Questions Asked 1 <RequiredIndicator />
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Write / Paste the Q here" {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.items?.[index]?.question1?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`items[${index}].question2`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Additional Questions Asked 2 <RequiredIndicator />
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Write / Paste the Q here" {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.items?.[index]?.question2?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`items[${index}].question3`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Additional Questions Asked 3 <RequiredIndicator />
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Write / Paste the Q here" {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.items?.[index]?.question3?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name={`items[${index}].coverLetter`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Cover Letter Needed <RequiredIndicator />
                                            </FormLabel>
                                            <FormControl>
                                                <Checkbox {...field} />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.items?.[index]?.coverLetter?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <div className="flex gap-4 cursor-pointer mt-8">
                                    <Button
                                        type="button"
                                        onClick={handleAddItem}
                                        className="gap-2"
                                        size="sm"
                                    >
                                        <PlusCircle className="size-4" />
                                        <p className="text-sm">Add</p>
                                    </Button>
                                    {fields.length > 1 && (
                                        <Button
                                            type="button"
                                            onClick={() => handleDeleteItem(index)}
                                            className="gap-2"
                                            size="sm"
                                            variant="destructive"
                                        >
                                            <Trash2 className="size-4" />
                                            <p className="text-sm">Remove</p>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </ScrollBar>
                    <div className="w-full flex items-center justify-end gap-4 mt-4">
                        <Button type="submit">Apply / Bulk Apply</Button>
                        <Button type="button" variant="outline">Excel Upload</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
