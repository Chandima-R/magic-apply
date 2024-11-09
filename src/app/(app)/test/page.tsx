"use client";

import { Button } from "@/components/ui/button";
import { CERTIFICATE_INFORMATION_BY_USER_ID } from "@/graphql/certification";
import { CONTACT_INFORMATION } from "@/graphql/contact";
import { EDUCATION_INFORMATION_BY_USER_ID } from "@/graphql/education";
import { EXPERIENCE_INFORMATION_BY_USER_ID } from "@/graphql/experience";
import { INVOLVEMENT_INFORMATION_BY_USER_ID } from "@/graphql/involvement";
import { PROJECT_INFORMATION_BY_USER_ID } from "@/graphql/project";
import { SKILLS_INFORMATION_BY_USER_ID } from "@/graphql/skills";
import { SUMMARY_INFORMATION_BY_USER_ID } from "@/graphql/summary";
import { generateJsonResponse } from "@/utils/jsongpt";
import { useSubscription } from "@apollo/client";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { user } = useUser();

  const { data: certificationData } = useSubscription(
    CERTIFICATE_INFORMATION_BY_USER_ID,
    {
      variables: { _eq: user?.id },
    }
  );

  const { data: contactData } = useSubscription(CONTACT_INFORMATION, {
    variables: { _eq: user?.id },
  });

  const { data: educationData } = useSubscription(
    EDUCATION_INFORMATION_BY_USER_ID,
    {
      variables: { _eq: user?.id },
    }
  );

  const { data: experienceData } = useSubscription(
    EXPERIENCE_INFORMATION_BY_USER_ID,
    {
      variables: { _eq: user?.id },
    }
  );

  const { data: involvementData } = useSubscription(
    INVOLVEMENT_INFORMATION_BY_USER_ID,
    {
      variables: { _eq: user?.id },
    }
  );

  const { data: projectData } = useSubscription(
    PROJECT_INFORMATION_BY_USER_ID,
    {
      variables: { _eq: user?.id },
    }
  );

  const { data: skillsData } = useSubscription(SKILLS_INFORMATION_BY_USER_ID, {
    variables: { _eq: user?.id },
  });

  const { data: summaryData } = useSubscription(
    SUMMARY_INFORMATION_BY_USER_ID,
    {
      variables: { _eq: user?.id },
    }
  );

  const contact = contactData?.contact[0];
  const education = educationData?.education;
  const certification = certificationData?.certification;
  const experience = experienceData?.experience;
  const involvement = involvementData?.involvement;
  const project = projectData?.project;
  const skills = skillsData?.skill[0];
  const summary = summaryData?.summary[0];

  const enhanceResumeData = async () => {
    const message = {
      contact,
      education,
      certification,
      experience,
      involvement,
      project,
      skills,
      summary,
    };

    try {
      const enhancedData = await generateJsonResponse(
        "resumeEnhancement",
        message
      );
      console.log("Enhanced Resume Data:", enhancedData);
    } catch (error) {
      console.error("Error enhancing resume data:", error);
    }
  };

  return (
    <div>
      <Button onClick={enhanceResumeData}>Enhance Resume Data</Button>
    </div>
  );
}
