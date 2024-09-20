import React, { useEffect, useState } from "react";
import { CustomButton } from "../custom-button";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { summarizeGPT } from "@/utils/summarize-gpt";
import { Linkedin, Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { summarizAndBulletGPT } from "@/utils/summarize-bullets-gpt";

interface Props {
  certificate: any;
  contact: any;
  coursework: any;
  education: any;
  experience: any;
  involvement: any;
  project: any;
  skills: any;
  summary: any;
}

export const WordPage = ({
  certificate,
  contact,
  coursework,
  education,
  experience,
  involvement,
  project,
  skills,
  summary,
}: Props) => {
  const technicalSkills = skills?.technical_skills
    ?.split(",")
    .map((skill: any) => skill.trim());
  const otherSkills = skills?.other_skills
    ?.split(",")
    .map((skill: any) => skill.trim());
  const languageSkills = skills?.language_skills
    ?.split(",")
    .map((skill: any) => skill.trim());
  const interests = skills?.interests
    ?.split(",")
    .map((skill: any) => skill.trim());

  const generateWordFile = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: contact?.contact_name,
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun(`Telephone: ${contact?.contact_phone}`),
                new TextRun(`Email: ${contact?.contact_email}`),
                new TextRun(`Location: ${contact?.contact_city}`),
                new TextRun(`LinkedIn: ${contact?.contact_linkedin}`),
              ],
            }),
            new Paragraph({
              text: "Summary",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph(summary?.summary_description),
            new Paragraph({
              text: "Experience",
              heading: HeadingLevel.HEADING_2,
            }),
            ...experience?.map(
              (exp: any) =>
                new Paragraph({
                  children: [
                    new TextRun(
                      `${exp?.company_role}, ${exp?.company_location}`
                    ),
                    new TextRun(
                      ` ${new Date(exp?.company_start_date).toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" }
                      )} - ${
                        exp?.company_end_date
                          ? new Date(exp?.company_end_date).toLocaleDateString(
                              "en-US",
                              { month: "short", year: "numeric" }
                            )
                          : "Current"
                      }`
                    ),
                    new TextRun(
                      `${exp?.company_name}: ${exp?.company_role_description}`
                    ),
                  ],
                })
            ),
            new Paragraph({
              text: "Education",
              heading: HeadingLevel.HEADING_2,
            }),
            ...education?.map(
              (edu: any) =>
                new Paragraph({
                  children: [
                    new TextRun(
                      `${edu?.education_institute}, ${edu?.education_location}`
                    ),
                    new TextRun(
                      ` ${new Date(
                        edu?.education_completion_year
                      ).getFullYear()}`
                    ),
                    new TextRun(`Specialization: ${edu?.education_major}`),
                    edu?.educatoin_additional_information &&
                      new TextRun(`${edu?.educatoin_additional_information}`),
                  ],
                })
            ),
            new Paragraph({
              text: "Projects and Involvements",
              heading: HeadingLevel.HEADING_2,
            }),
            ...project?.map(
              (pro: any) =>
                new Paragraph({
                  children: [
                    new TextRun(
                      `${pro?.project_name}, ${pro?.project_organization}`
                    ),
                    new TextRun(
                      ` ${new Date(pro?.project_start_date).toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" }
                      )} - ${new Date(pro?.project_end_date).toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" }
                      )}`
                    ),
                    new TextRun(`${pro?.project_role_description}`),
                  ],
                })
            ),
            ...involvement?.map(
              (inv: any) =>
                new Paragraph({
                  children: [
                    new TextRun(
                      `${inv?.involvement_organization_role}, ${inv?.involevement_organization}`
                    ),
                    new TextRun(
                      ` ${new Date(
                        inv?.involvement_start_date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })} - ${new Date(
                        inv?.involvement_end_date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}`
                    ),
                    new TextRun(`${inv?.involvement_description}`),
                  ],
                })
            ),
            new Paragraph({
              text: "Skills, Languages, and Interests",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text: "Technical Skills",
              heading: HeadingLevel.HEADING_3,
            }),
            ...technicalSkills?.map(
              (skill: any) => new Paragraph({ text: skill })
            ),
            new Paragraph({
              text: "Other Skills",
              heading: HeadingLevel.HEADING_3,
            }),
            ...otherSkills?.map((skill: any) => new Paragraph({ text: skill })),
            new Paragraph({
              text: "Languages",
              heading: HeadingLevel.HEADING_3,
            }),
            ...languageSkills?.map(
              (skill: any) => new Paragraph({ text: skill })
            ),
            new Paragraph({
              text: "Interests",
              heading: HeadingLevel.HEADING_3,
            }),
            ...interests?.map(
              (interest: any) => new Paragraph({ text: interest })
            ),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${contact?.contact_name}.docx`);
    });
  };
  const [summarizedExperience, setSummarizedExperience] = useState<any>([]);
  const [summarizedIProjects, setSummarizedProjects] = useState<any>([]);
  const [summarizedInvolvments, setSummarizedInvolvments] = useState<any>([]);

  useEffect(() => {
    const fetchExperienceSummaries = async () => {
      try {
        const experienceSummaries = await Promise.all(
          experience.map(async (exp: any) => {
            try {
              const summary = await summarizAndBulletGPT(
                "summarizeAndBulletPoints",
                { content: exp.company_role_description }
              );
              return { ...exp, summarizedDescription: summary };
            } catch (error) {
              console.error("Error summarizing description:", error);
              return {
                ...exp,
                summarizedDescription: "Error summarizing description",
              };
            }
          })
        );
        setSummarizedExperience(experienceSummaries);
      } catch (error) {
        console.error("Error fetching summaries:", error);
      }
    };

    if (experience?.length > 0) {
      fetchExperienceSummaries();
    }

    const fetchProjects = async () => {
      try {
        const projectSummaries = await Promise.all(
          project.map(async (pr: any) => {
            try {
              const summary = await summarizeGPT(
                "summarizeDesc",
                pr.project_role_description
              );
              return { ...pr, summarizedDescription: summary };
            } catch (error) {
              console.error("Error summarizing description:", error);
              return {
                ...pr,
                summarizedDescription: "Error summarizing description",
              };
            }
          })
        );
        setSummarizedProjects(projectSummaries);
      } catch (error) {
        console.error("Error fetching summaries:", error);
      }
    };

    if (project?.length > 0) {
      fetchProjects();
    }

    const fetchInvolvements = async () => {
      try {
        const InvolvementSummaries = await Promise.all(
          involvement.map(async (inv: any) => {
            try {
              const summary = await summarizeGPT(
                "summarizeDesc",
                inv.involvement_description
              );
              return { ...inv, summarizedDescription: summary };
            } catch (error) {
              console.error("Error summarizing description:", error);
              return {
                ...inv,
                summarizedDescription: "Error summarizing description",
              };
            }
          })
        );
        setSummarizedInvolvments(InvolvementSummaries);
      } catch (error) {
        console.error("Error fetching summaries:", error);
      }
    };

    if (involvement?.length > 0) {
      fetchInvolvements();
    }
  }, [experience, involvement, project]);

  return (
    <div className="p-4">
      <header className="pb-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-2">{contact?.contact_name}</h1>
        <div className="flex items-center space-x-6">
          <p className="text-md font-normal  flex items-center">
            <Smartphone className="size-4 mr-1" />
            {contact?.contact_phone}
          </p>

          <p className="text-md font-normal flex items-center">
            <Mail className="size-4 mr-1" /> {contact?.contact_email}
          </p>
          <p className="text-md font-normal flex items-center">
            <MapPin className="size-4 mr-1" /> {contact?.contact_city}
          </p>
        </div>
        <div className="pt-2">
          <p className="text-md font-normal flex items-center">
            <Linkedin className="size-4 mr-1" /> {contact?.contact_linkedin}
          </p>
        </div>
      </header>

      <section className="py-2">
        <h2 className="text-xl font-medium text-honoluluBlue border-b border-honoluluBlue pb-1">
          Professional Summary
        </h2>
        <p className="text-md mt-2 text-justify">
          {summary?.summary_description}
        </p>
      </section>

      <section className="py-2">
        <h2 className="text-xl font-medium text-honoluluBlue border-b border-honoluluBlue pb-1">
          Experience
        </h2>
        {summarizedExperience?.map((exp: any) => (
          <>
            {exp?.company_end_date === "" && (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <h3 className="text-md font-semibold capitalize mr-2">
                      {exp?.company_role},
                    </h3>
                    <h4 className="text-md font-semibold mr-2">
                      {exp?.company_name},
                    </h4>
                    <span className="text-md font-normal capitalize">
                      {exp?.company_location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <p className="text-md">
                      {new Date(exp?.company_start_date).toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" }
                      )}
                    </p>
                    <span className="text-md"> - </span>
                    <p className="text-md">Current</p>
                  </div>
                </div>

                <div className="mt-2 flex">
                  <div className="w-3 h-3 flex items-center justify-center mt-1.5 mr-1"></div>

                  <ul className="list-disc text-honoluluBlue">
                    {exp?.summarizedDescription
                      ?.split("-")
                      ?.slice(1)
                      ?.map((experience: any, index: number) => (
                        <li key={index}>
                          <p className="text-md text-justify text-black">
                            {experience}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        ))}
        {summarizedExperience?.map((exp: any) => (
          <>
            {exp?.company_end_date?.length > 0 && (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <h3 className="text-md font-semibold capitalize mr-2">
                      {exp?.company_role},
                    </h3>
                    <h4 className="text-md font-semibold mr-2">
                      {exp?.company_name},
                    </h4>
                    <span className="text-md font-normal capitalize">
                      {exp?.company_location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <p className="text-md">
                      {new Date(exp?.company_start_date).toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" }
                      )}
                    </p>
                    <span className="text-md"> - </span>
                    <p className="text-md">
                      {new Date(exp?.company_end_date).toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" }
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex">
                  <div className="w-3 h-3 flex items-center justify-center mt-1.5 mr-1"></div>

                  <ul className="list-disc text-honoluluBlue">
                    {exp?.summarizedDescription
                      ?.split("-")
                      ?.slice(1)
                      ?.map((experience: any, index: number) => (
                        <li key={index}>
                          <p className="text-md text-justify text-black">
                            {experience}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        ))}
      </section>

      <section className="py-2">
        <h2 className="text-xl font-medium text-honoluluBlue border-b border-honoluluBlue pb-1">
          Education
        </h2>
        {education?.map((edu: any) => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="text-md capitalize mr-2 font-semibold">
                  {edu?.education_institute},
                </h3>
                <span className="text-md font-normal capitalize">
                  {edu?.education_location}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <p className="text-md">
                  {new Date(edu?.education_start_date).toLocaleDateString(
                    "en-US",
                    { month: "short", year: "numeric" }
                  )}
                </p>
                <span className="text-md"> - </span>
                <p className="text-md">
                  {new Date(edu?.education_end_date).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex">
                <div className="w-3 h-3 flex items-center justify-center mt-1.5 mr-1">
                  <span className="h-1.5 w-1.5 bg-honoluluBlue rounded-full" />
                </div>
                <h4 className="text-md font-normal">{edu?.education_major}</h4>
              </div>

              {edu?.education_specialization && (
                <h4 className="text-md font-normal">
                  Specialization: {edu?.education_specialization}
                </h4>
              )}
              {edu?.educatoin_additional_information && (
                <p className="text-md mt-1">
                  {edu?.educatoin_additional_information}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="py-2">
        <h2 className="text-xl font-medium text-honoluluBlue border-b border-honoluluBlue pb-1">
          Projects and Involvements
        </h2>
        {summarizedIProjects?.map((pro: any) => (
          <div key={pro.id} className="mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="text-md font-semibold capitalize mr-2">
                  {pro?.project_name},
                </h3>
                <span className="text-md font-normal capitalize">
                  {pro?.project_organization}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <p className="text-md">
                  {new Date(pro?.project_start_date).toLocaleDateString(
                    "en-US",
                    { month: "short", year: "numeric" }
                  )}
                </p>
                <span className="text-md"> - </span>
                <p className="text-md">
                  {new Date(pro?.project_end_date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="mt-2 flex">
              <div className="w-3 h-3 flex items-center justify-center mt-1.5 mr-1">
                <span className="h-1.5 w-1.5 bg-honoluluBlue rounded-full" />
              </div>
              <h4 className="text-md font-normal text-justify">
                {pro?.summarizedDescription}
              </h4>
            </div>
          </div>
        ))}
        {summarizedInvolvments?.map((inv: any) => (
          <div key={inv.id} className="mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="text-md font-semibold capitalize mr-2">
                  {inv?.involvement_organization_role},
                </h3>
                <span className="text-md font-normal capitalize">
                  {inv?.involevement_organization}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <p className="text-md">
                  {new Date(inv?.involvement_start_date).toLocaleDateString(
                    "en-US",
                    { month: "short", year: "numeric" }
                  )}
                </p>
                <span className="text-md"> - </span>
                <p className="text-md">
                  {new Date(inv?.involvement_end_date).toLocaleDateString(
                    "en-US",
                    { month: "short", year: "numeric" }
                  )}
                </p>
              </div>
            </div>
            <div className="mt-2 flex">
              <div className="w-3 h-3 flex items-center justify-center mt-1.5 mr-1">
                <span className="h-1.5 w-1.5 bg-honoluluBlue rounded-full" />
              </div>
              <h4 className="text-md font-normal text-justify">
                {inv?.summarizedDescription}
              </h4>
            </div>
          </div>
        ))}
      </section>

      <section className="py-2">
        <h2 className="text-xl font-medium text-honoluluBlue border-b border-honoluluBlue pb-1">
          Skills, Languages, and Interests
        </h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="py-2">
            <h3 className="text-lg font-medium text-honoluluBlue">
              Technical Skills
            </h3>
            {technicalSkills?.map((skill: any, index: number) => (
              <li key={index} className="text-md">
                {skill}
              </li>
            ))}
          </div>
          <div className="py-2">
            <h3 className="text-lg font-medium text-honoluluBlue">
              Other Skills
            </h3>
            {otherSkills?.map((skill: any, index: number) => (
              <li key={index} className="text-md">
                {skill}
              </li>
            ))}
          </div>
          <div className="py-2">
            <h3 className="text-lg font-medium text-honoluluBlue">Languages</h3>
            {languageSkills?.map((skill: any, index: number) => (
              <li key={index} className="text-md">
                {skill}
              </li>
            ))}
          </div>
          <div className="py-2">
            <h3 className="text-lg font-medium text-honoluluBlue">Interests</h3>
            {interests?.map((interest: any, index: number) => (
              <li key={index} className="text-md">
                {interest}
              </li>
            ))}
          </div>
        </div>
      </section>

      <footer className="pt-4 w-full flex items-center justify-end">
        <Button
          size={"sm"}
          className={
            "bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue"
          }
          onClick={generateWordFile}
        >
          Downlod word file
        </Button>
      </footer>
    </div>
  );
};
