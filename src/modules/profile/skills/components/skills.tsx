"use client";

import { CustomButton } from "@/modules/shared/components/custom-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { ProfileActiveLinks } from "@/modules/shared/components/profile-active-links";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { useMutation, useSubscription } from "@apollo/client";
import {
  ADD_NEW_SKILL_BY_USER_ID,
  SKILLS_INFORMATION_BY_USER_ID,
  UPDATE_SKILL_BY_ID,
} from "@/graphql/skills";
import { LoadingButton } from "@/modules/shared/components/loading-button";
import { X } from "lucide-react";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";

const skillSchema = z.object({
  skill: z.string().optional(),
});

export const Skills = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [existingSkillId, setExistingSkillId] = useState<string | null>(null);

  const [insertSkills] = useMutation(ADD_NEW_SKILL_BY_USER_ID);
  const [updateSkills] = useMutation(UPDATE_SKILL_BY_ID);

  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skill: "",
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.includes(",")) {
      const newSkills = value
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);
      setSkills([...skills, ...newSkills]);
      setInputValue("");
    } else {
      setInputValue(value);
    }
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const { data: skillData, loading: skillLoading } = useSubscription(
    SKILLS_INFORMATION_BY_USER_ID,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  useEffect(() => {
    if (skillData && skillData.skill.length > 0) {
      const existingSkills = skillData.skill[0];
      setExistingSkillId(existingSkills.id);
      setSkills(existingSkills.skill_name.split(", "));
    }
  }, [skillData]);

  const onSubmit = async () => {
    const skillsString = skills.join(", ");
    setIsLoading(true);

    try {
      if (existingSkillId) {
        await updateSkills({
          variables: {
            skill_name: skillsString,
            _eq: existingSkillId,
          },
        });
        toast({
          variant: "default",
          title: "Success.",
          description: "Your skills were updated successfully.",
        });
      } else {
        await insertSkills({
          variables: {
            skill_name: skillsString,
            user_id: user?.id,
          },
        });
        toast({
          variant: "default",
          title: "Success.",
          description: "Your skills were added to the skills list.",
        });
      }
      setSkills([]);
      setInputValue("");
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const path = usePathname();
  const activeLink = path.split("/")[2];

  return (
    <>
      <ProfileActiveLinks activeLink={activeLink} />
      {skillLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3">
            <div className="rounded-sm overflow-hidden shadow">
              <video className="w-full object-cover h-auto" controls>
                <source src="/video/resume-builder.mp4" />
              </video>
            </div>
          </div>
          <div className="w-full lg:w-2/3 px-2 lg:px-6 py-4 lg:py-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="gap-2 grid grid-cols-1 w-full">
                  <FormField
                    control={form.control}
                    name="skill"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter the skills you possess</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Front End: HTML, CSS, JavaScript."
                            {...field}
                            value={inputValue}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {skills.map((skill, index) => (
                            <div
                              key={index}
                              className="text-sm items-center flex cursor-pointer font-normal rounded-full capitalize text-black bg-slate-200/40 px-4 py-1.5 hover:bg-slate-400/40 shadow-sm"
                            >
                              <span>{skill}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(index)}
                                className="ml-2 text-red-400"
                              >
                                <X className="size-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end w-full mt-8">
                  <div className="w-38">
                    {isLoading ? (
                      <LoadingButton />
                    ) : (
                      <>
                        <CustomButton
                          type="submit"
                          title="Save to skills list"
                        />
                      </>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};
