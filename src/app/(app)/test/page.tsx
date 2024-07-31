"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { MultiInputField } from "@/modules/shared/mult-input-field";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className={"max-w-[1280px] w-full mx-auto p-8"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <MultiInputField
            fieldLabel={"multi input field"}
            fieldName={"username"}
            control={undefined}
            placeholder={"still working on"}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
