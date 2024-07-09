"use client";

import { CustomButton } from "@/modules/shared/components/custom-button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { ProfileActiveLinks } from "@/modules/shared/components/profile-active-links";
import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useMutation, useSubscription } from "@apollo/client";
import {
  ADD_NEW_SKILL_BY_USER_ID,
  SKILLS_INFORMATION_BY_USER_ID,
  UPDATE_SKILL_BY_ID,
} from "@/graphql/skills";
import { LoadingButton } from "@/modules/shared/components/loading-button";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";
import { BubbleInputField } from "@/modules/shared/components/bubbleInputField";

const skillSchema = z.object({
  technicalSkills: z.string().optional(),
  otherSkills: z.string().optional(),
  languages: z.string().optional(),
  interests: z.string().optional(),
});

export const Skills = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [otherSkills, setOtherSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState({
    technicalSkills: "",
    otherSkills: "",
    languages: "",
    interests: "",
  });
  const [existingSkillId, setExistingSkillId] = useState<string | null>(null);

  const [insertSkills] = useMutation(ADD_NEW_SKILL_BY_USER_ID);
  const [updateSkills] = useMutation(UPDATE_SKILL_BY_ID);

  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      technicalSkills: "",
      otherSkills: "",
      languages: "",
      interests: "",
    },
  });

  const handleInputChange = useCallback(
      (category: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.includes(",")) {
          const newSkills = value
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill.length > 0);
          switch (category) {
            case "technicalSkills":
              setTechnicalSkills([...technicalSkills, ...newSkills]);
              break;
            case "otherSkills":
              setOtherSkills([...otherSkills, ...newSkills]);
              break;
            case "languages":
              setLanguages([...languages, ...newSkills]);
              break;
            case "interests":
              setInterests([...interests, ...newSkills]);
              break;
            default:
              break;
          }
          setInputValues((prevValues) => ({ ...prevValues, [category]: "" }));
        } else {
          setInputValues((prevValues) => ({ ...prevValues, [category]: value }));
        }
      },
      [technicalSkills, otherSkills, languages, interests]
  );

  const handleRemoveSkill = useCallback(
      (category: string, index: number) => {
        switch (category) {
          case "technicalSkills":
            setTechnicalSkills(technicalSkills.filter((_, i) => i !== index));
            break;
          case "otherSkills":
            setOtherSkills(otherSkills.filter((_, i) => i !== index));
            break;
          case "languages":
            setLanguages(languages.filter((_, i) => i !== index));
            break;
          case "interests":
            setInterests(interests.filter((_, i) => i !== index));
            break;
          default:
            break;
        }
      },
      [technicalSkills, otherSkills, languages, interests]
  );

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
      setTechnicalSkills(existingSkills.technical_skills?.split(", ") || []);
      setOtherSkills(existingSkills.other_skills?.split(", ") || []);
      setLanguages(existingSkills.language_skills?.split(", ") || []);
      setInterests(existingSkills.interests?.split(", ") || []);
    }
  }, [skillData]);

  const onSubmit = async () => {
    const skills = {
      technical_skills: technicalSkills.join(", "),
      other_skills: otherSkills.join(", "),
      language_skills: languages.join(", "),
      interests: interests.join(", "),
    };
    setIsLoading(true);

    try {
      if (existingSkillId) {
        await updateSkills({
          variables: {
            _eq: existingSkillId,
            interests: skills.interests,
            language_skills: skills.language_skills,
            other_skills: skills.other_skills,
            technical_skills: skills.technical_skills,
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
            interests: skills.interests,
            language_skills: skills.language_skills,
            other_skills: skills.other_skills,
            technical_skills: skills.technical_skills,
            user_id: user?.id,
          },
        });
        toast({
          variant: "default",
          title: "Success.",
          description: "Your skills were added to the skills list.",
        });
      }
      setTechnicalSkills([]);
      setOtherSkills([]);
      setLanguages([]);
      setInterests([]);
      setInputValues({ technicalSkills: "", otherSkills: "", languages: "", interests: "" });
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
                    <div className="gap-4 grid grid-cols-1 w-full">
                      <BubbleInputField
                          fieldName="technicalSkills"
                          fieldLabel="Enter technical skills you possess"
                          placeholder="Front End: HTML, CSS, JavaScript."
                          options={technicalSkills}
                          inputValue={inputValues.technicalSkills}
                          onChange={handleInputChange("technicalSkills")}
                          onRemove={(index: number) => handleRemoveSkill("technicalSkills", index)}
                          control={form.control}
                      />

                      <BubbleInputField
                          fieldName="otherSkills"
                          fieldLabel="Enter other skills you possess"
                          placeholder="Other skills: Public Speaking, Project Management."
                          options={otherSkills}
                          inputValue={inputValues.otherSkills}
                          onChange={handleInputChange("otherSkills")}
                          onRemove={(index: number) => handleRemoveSkill("otherSkills", index)}
                          control={form.control}
                      />

                      <BubbleInputField
                          fieldName="languages"
                          fieldLabel="Enter the languages you are eligible with"
                          placeholder="Languages: English, Spanish, French."
                          options={languages}
                          inputValue={inputValues.languages}
                          onChange={handleInputChange("languages")}
                          onRemove={(index: number) => handleRemoveSkill("languages", index)}
                          control={form.control}
                      />

                      <BubbleInputField
                          fieldName="interests"
                          fieldLabel="Enter your interests"
                          placeholder="Interests: Reading, Hiking, Coding."
                          options={interests}
                          inputValue={inputValues.interests}
                          onChange={handleInputChange("interests")}
                          onRemove={(index: number) => handleRemoveSkill("interests", index)}
                          control={form.control}
                      />
                    </div>

                    <div className="flex justify-end w-full mt-8">
                      <div className="w-38">
                        {isLoading ? (
                            <LoadingButton />
                        ) : (
                            <CustomButton type="submit" title="Save to skills list" />
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
