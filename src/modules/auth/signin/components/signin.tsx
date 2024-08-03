"use client";

import { Button } from "@/components/ui/button";
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
import { signIn } from "next-auth/react";
import Image from "next/image";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .nonempty("Password is required."),
});

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (result?.error === "CredentialsSignin") {
        toast({
          variant: "destructive",
          title: "Error.",
          description:
            "You have entered an invalid username or password. Please try again.",
        });
      } else {
        setIsLoading(true);
        router.push("/");
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
        <div className="w-full p-2 mb-2 flex items-center gap-2 justify-center">
          <Image
            src={"/images/logo.svg"}
            alt="logo"
            width={400}
            height={400}
            className="w-12 lg:w-16 h-auto object-cover"
          />

          <h1 className={"font-bold text-4xl lg:text-6xl text-slate-700"}>
            MagicApply
          </h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 w-full max-w-[400px]"
          >
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

            <CustomButton title={"Sign in"} type={"submit"} />
          </form>
        </Form>
      </div>

      <SessionHeader />
    </div>
  );
};
