"use client";

import { useUser } from "@clerk/nextjs";
import { useSubscription } from "@apollo/client";
import { CONTACT_INFORMATION } from "@/graphql/contact";
import { CERTIFICATE_INFORMATION_BY_USER_ID } from "@/graphql/certification";
import { EDUCATION_INFORMATION_BY_USER_ID } from "@/graphql/education";
import { EXPERIENCE_INFORMATION_BY_USER_ID } from "@/graphql/experience";
import { INVOLVEMENT_INFORMATION_BY_USER_ID } from "@/graphql/involvement";
import { PROJECT_INFORMATION_BY_USER_ID } from "@/graphql/project";
import { SKILLS_INFORMATION_BY_USER_ID } from "@/graphql/skills";
import { SUMMARY_INFORMATION_BY_USER_ID } from "@/graphql/summary";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";
import { WordPage } from "@/modules/shared/components/word-viewer/word";

export const MasterResume = () => {
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

  const { data: summaryData, loading: summaryLoading } = useSubscription(
    SUMMARY_INFORMATION_BY_USER_ID,
    {
      variables: { _eq: user?.id },
    }
  );

  const certificates = certificationData?.certification?.map((c: any) => c);
  const visibleCertificates = certificates?.filter(
    (cer: any) => cer.visibility === true
  );

  const contact = contactData?.contact[0];

  const education = educationData?.education?.map((c: any) => c);
  const visibleEducation = education?.filter(
    (ed: any) => ed.visibility === true
  );

  const experience = experienceData?.experience?.map((c: any) => c);
  const visibleExperience = experience?.filter(
    (ex: any) => ex.visibility === true
  );

  const involvement = involvementData?.involvement?.map((c: any) => c);
  const visibleInvolvement = involvement?.filter(
    (inv: any) => inv.visibility === true
  );

  const project = projectData?.project?.map((c: any) => c);
  const visibleProjects = project?.filter((pr: any) => pr.visibility === true);

  const skills = skillsData?.skill[0];

  const summary = summaryData?.summary[0];

  return (
    <>
      {/* <div className="w-full items-center justify-end flex gap-4 mb-4">
        <Button
          size={"sm"}
          variant={activeView === "pdf" ? "outline" : "default"}
          onClick={() => setActiveView("pdf")}
        >
          View PDF
        </Button>
        <Button
          size={"sm"}
          variant={activeView === "word" ? "outline" : "default"}
          onClick={() => setActiveView("word")}
        >
          View Word
        </Button>
      </div> */}
      {summaryLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {/* {activeView === "pdf" ? (
            <PdfPage
              certificate={visibleCertificates}
              contact={contact}
              coursework={visibleCoursework}
              education={visibleEducation}
              experience={visibleExperience}
              involvement={visibleInvolvement}
              project={visibleProjects}
              skills={skills}
              summary={summary}
            />
          ) : ( */}
          <WordPage
            certificate={visibleCertificates}
            contact={contact}
            education={visibleEducation}
            experience={visibleExperience}
            involvement={visibleInvolvement}
            project={visibleProjects}
            skills={skills}
            summary={summary}
          />
          {/* )} */}
        </div>
      )}
    </>
  );
};
