"use client";

import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { CustomButton } from "@/modules/shared/components/custom-button";
import { SessionHeader } from "@/modules/shared/components/session-header";
import { TextInput } from "@/modules/shared/components/text-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  firstname: z.string().nonempty("First name is required."),
  lastname: z.string().nonempty("Last name is required."),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .nonempty("Password is required."),
});

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      // Your registration logic here, e.g., API call
      // For example:
      const response = await fetch("/api/user/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          variant: "default",
          title: "Success.",
          description: "Registration successful.",
        });
        router.push("/dashboard"); // Redirect after successful registration
      } else {
        toast({
          variant: "destructive",
          title: "Error.",
          description: result.message || "Registration failed.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error.",
        description: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={
        "w-full max-w-screen mx-auto h-screen flex justify-center scroll-auto"
      }
    >
      <div className="w-full lg:w-1/3 flex flex-col items-center justify-center py-28 px-14 lg:px-16 mx-auto">
        <h1 className={"font-bold text-4xl lg:text-6xl mb-12 text-slate-700"}>
          MagicApply
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 w-full max-w-[400px]"
          >
            <TextInput
              placeholder={"First name"}
              fieldName={"firstname"}
              fieldLabel=""
              control={form.control}
            />

            <TextInput
              placeholder={"Last name"}
              fieldName={"lastname"}
              fieldLabel=""
              control={form.control}
            />

            <TextInput
              placeholder={"name@example.com"}
              fieldName={"email"}
              fieldLabel=""
              control={form.control}
            />

            <TextInput
              placeholder={"password"}
              fieldName={"password"}
              fieldLabel=""
              control={form.control}
            />

            <CustomButton title={"Sign Up"} type={"submit"} />
          </form>
        </Form>
      </div>

      <SessionHeader />
    </div>
  );
};
