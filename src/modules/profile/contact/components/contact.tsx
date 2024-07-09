"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/modules/shared/components/text-input";
import { CustomButton } from "@/modules/shared/components/custom-button";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useSubscription } from "@apollo/client";
import {
  ADD_NEW_CONTACT,
  CONTACT_INFORMATION,
  UPDATE_CONTACT,
} from "@/graphql/contact";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ProfileActiveLinks } from "@/modules/shared/components/profile-active-links";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";
import { LoadingButton } from "@/modules/shared/components/loading-button";

const contactSchema = z.object({
  fullName: z.string().nonempty("Full name is required."),
  email: z.string().nonempty("Email address is required.").email(),
  phone: z.string().nonempty("Phone number is required."),
  linkedin: z.string().nonempty("LinkedIn is required."),
  personalWebsite: z.string().optional(),
  country: z.string().nonempty("Country is required."),
  state: z.string().optional(),
  city: z.string().nonempty("City is required."),
});

export const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const { data: contactData, loading: contactLoading } = useSubscription(
    CONTACT_INFORMATION,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  const contactDetails =
    contactData?.contact?.find((c: any) => c?.user_id === user?.id) || {};

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      personalWebsite: "",
      country: "",
      state: "",
      city: "",
    },
  });

  useEffect(() => {
    if (contactDetails && Object.keys(contactDetails).length > 0) {
      form.reset({
        fullName: contactDetails.contact_name || "",
        email: contactDetails.contact_email || "",
        phone: contactDetails.contact_phone || "",
        linkedin: contactDetails.contact_linkedin || "",
        personalWebsite: contactDetails.contact_website || "",
        country: contactDetails.contact_country || "",
        state: contactDetails.contact_state || "",
        city: contactDetails.contact_city || "",
      });
    }
  }, [contactDetails, form]);

  const [addContact] = useMutation(ADD_NEW_CONTACT);
  const [updateContact] = useMutation(UPDATE_CONTACT);

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    try {
      if (!user?.id) {
        throw new Error("User is not authenticated");
      }
      setIsLoading(true);
      if (contactDetails && contactDetails.id) {
        await updateContact({
          variables: {
            _eq: contactDetails.id,
            contact_city: values.city,
            contact_country: values.country,
            contact_email: values.email,
            contact_linkedin: values.linkedin,
            contact_name: values.fullName,
            contact_phone: values.phone,
            contact_state: values.state,
            contact_website: values.personalWebsite,
          },
        });
        toast({
          variant: "default",
          title: "Success.",
          description: "Your contact was updated.",
        });
      } else {
        await addContact({
          variables: {
            contact_city: values.city,
            contact_country: values.country,
            contact_email: values.email,
            contact_linkedin: values.linkedin,
            contact_name: values.fullName,
            contact_phone: values.phone,
            contact_state: values.state,
            contact_website: values.personalWebsite,
            user_id: user.id,
          },
        });
        toast({
          variant: "default",
          title: "Success.",
          description: "Your contact was added.",
        });
      }
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const path = usePathname();
  const activeLink = path.split("/")[2];

  return (
    <>
      <ProfileActiveLinks activeLink={activeLink} />
      {contactLoading ? (
        <LoadingSpinner />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="gap-4 lg:gap-8 grid grid-cols-1 lg:grid-cols-2 w-full">
              <TextInput
                fieldLabel="Full name"
                fieldName="fullName"
                control={form.control}
                placeholder="Charles Bloomberg"
                required
              />
              <TextInput
                fieldLabel="Email address"
                fieldName="email"
                control={form.control}
                placeholder="charlesbloomberg@wisc.edu"
                required
              />
              <TextInput
                fieldLabel="Phone number"
                fieldName="phone"
                control={form.control}
                placeholder="(621) 7999 5548"
                required
              />
              <TextInput
                fieldLabel="LinkedIn"
                fieldName="linkedin"
                control={form.control}
                placeholder="in/cbloomberg"
                required
              />
              <TextInput
                fieldLabel="Personal Website"
                fieldName="personalWebsite"
                control={form.control}
                placeholder="https://www.chaarlesbloomberg.com"
              />
              <TextInput
                fieldLabel="Country"
                fieldName="country"
                control={form.control}
                placeholder="Country"
                required
              />
              <TextInput
                fieldLabel="State"
                fieldName="state"
                control={form.control}
                placeholder="State"
              />
              <TextInput
                fieldLabel="City"
                fieldName="city"
                control={form.control}
                placeholder="City"
                required
              />
            </div>

            <div className="flex justify-end w-full mt-8">
              <div className="w-38">
                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <CustomButton type="submit" title="Save basic info" />
                )}
              </div>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};
