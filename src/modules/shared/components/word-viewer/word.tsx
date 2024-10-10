import React, { useEffect, useState } from "react";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { summarizeGPT } from "@/utils/summarize-gpt";
import { Linkedin, Mail, MapPin, Phone, Smartphone, X } from "lucide-react";
import { summarizAndBulletGPT } from "@/utils/summarize-bullets-gpt";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { jsPDF } from "jspdf";

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

  const generatePdfFile = () => {
    console.log("clicking on pdf");
    const doc = new jsPDF();

    // Set title
    doc.setFontSize(20);
    doc.text(contact?.contact_name, 20, 20);

    // Contact Information
    doc.setFontSize(12);
    doc.text(`Telephone: ${contact?.contact_phone}`, 20, 30);
    doc.text(`Email: ${contact?.contact_email}`, 20, 35);
    doc.text(`Location: ${contact?.contact_city}`, 20, 40);
    doc.text(`LinkedIn: ${contact?.contact_linkedin}`, 20, 45);

    // Summary
    doc.setFontSize(16);
    doc.text("Summary", 20, 55);
    doc.setFontSize(12);
    doc.text(summary?.summary_description, 20, 60, { maxWidth: 180 });

    // Experience
    doc.setFontSize(16);
    doc.text("Experience", 20, 90);
    experience?.forEach((exp: any, index: any) => {
      const expY = 100 + index * 30; // Adjust Y position for each experience entry
      doc.setFontSize(12);
      doc.text(`${exp?.company_role}, ${exp?.company_location}`, 20, expY);
      doc.text(
        ` ${new Date(exp?.company_start_date).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })} - ${
          exp?.company_end_date
            ? new Date(exp?.company_end_date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
            : "Current"
        }`,
        20,
        expY + 5
      );
      doc.text(
        `${exp?.company_name}: ${exp?.company_role_description}`,
        20,
        expY + 10
      );
    });

    // Education
    doc.setFontSize(16);
    doc.text("Education", 20, 150);
    education?.forEach((edu: any, index: any) => {
      const eduY = 160 + index * 30; // Adjust Y position for each education entry
      doc.setFontSize(12);
      doc.text(
        `${edu?.education_institute}, ${edu?.education_location}`,
        20,
        eduY
      );
      doc.text(
        ` ${new Date(edu?.education_completion_year).getFullYear()}`,
        20,
        eduY + 5
      );
      doc.text(`Specialization: ${edu?.education_major}`, 20, eduY + 10);
      if (edu?.educatoin_additional_information) {
        doc.text(`${edu?.educatoin_additional_information}`, 20, eduY + 15);
      }
    });

    // Projects and Involvements
    doc.setFontSize(16);
    doc.text("Projects and Involvements", 20, 230);
    project?.forEach((pro: any, index: any) => {
      const proY = 240 + index * 30; // Adjust Y position for each project entry
      doc.setFontSize(12);
      doc.text(`${pro?.project_name}, ${pro?.project_organization}`, 20, proY);
      doc.text(
        ` ${new Date(pro?.project_start_date).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })} - ${new Date(pro?.project_end_date).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })}`,
        20,
        proY + 5
      );
      doc.text(`${pro?.project_role_description}`, 20, proY + 10);
    });

    // Involvements
    involvement?.forEach((inv: any, index: any) => {
      const invY = 300 + index * 30; // Adjust Y position for each involvement entry
      doc.setFontSize(12);
      doc.text(
        `${inv?.involvement_organization_role}, ${inv?.involevement_organization}`,
        20,
        invY
      );
      doc.text(
        ` ${new Date(inv?.involvement_start_date).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })} - ${new Date(inv?.involvement_end_date).toLocaleDateString(
          "en-US",
          { month: "short", year: "numeric" }
        )}`,
        20,
        invY + 5
      );
      doc.text(`${inv?.involvement_description}`, 20, invY + 10);
    });

    // Skills, Languages, and Interests
    doc.setFontSize(16);
    doc.text("Skills, Languages, and Interests", 20, 370);

    // Technical Skills
    doc.setFontSize(14);
    doc.text("Technical Skills", 20, 390);
    technicalSkills?.forEach((skill: any, index: any) => {
      doc.setFontSize(12);
      doc.text(skill, 20, 400 + index * 5);
    });

    // Other Skills
    doc.setFontSize(14);
    doc.text("Other Skills", 20, 420 + technicalSkills.length * 5);
    otherSkills?.forEach((skill: any, index: any) => {
      doc.setFontSize(12);
      doc.text(skill, 20, 430 + technicalSkills.length * 5 + index * 5);
    });

    // Languages
    doc.setFontSize(14);
    doc.text(
      "Languages",
      20,
      450 + technicalSkills.length * 5 + otherSkills.length * 5
    );
    languageSkills?.forEach((skill: any, index: any) => {
      doc.setFontSize(12);
      doc.text(
        skill,
        20,
        460 + technicalSkills.length * 5 + otherSkills.length * 5 + index * 5
      );
    });

    // Interests
    doc.setFontSize(14);
    doc.text(
      "Interests",
      20,
      480 +
        technicalSkills.length * 5 +
        otherSkills.length * 5 +
        languageSkills.length * 5
    );
    interests?.forEach((interest: any, index: any) => {
      doc.setFontSize(12);
      doc.text(
        interest,
        20,
        490 +
          technicalSkills.length * 5 +
          otherSkills.length * 5 +
          languageSkills.length * 5 +
          index * 5
      );
    });

    // Save the PDF
    doc.save(`${contact?.contact_name}.pdf`);
  };

  const [profileSummary, setProfleSummary] = useState<string>("");
  const [summarizedExperience, setSummarizedExperience] = useState<any>([]);
  const [summarizedIProjects, setSummarizedProjects] = useState<any>([]);
  const [summarizedInvolvments, setSummarizedInvolvments] = useState<any>([]);

  useEffect(() => {
    const fetchProfileSummary = async () => {
      try {
        const sum = await summarizeGPT(
          "summarizeDesc",
          summary?.summary_description
        );

        setProfleSummary(sum);

        return { summarizedSummary: sum };
      } catch (error) {
        console.error("Error fetching profile summary:", error);
      }
    };

    fetchProfileSummary();

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
  }, [summary, experience, involvement, project]);

  return (
    <div className="p-4">
      <header className="pb-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-2">{contact?.contact_name}</h1>
        <div className="flex items-center space-x-6 ">
          <p className="text-md font-normal  flex items-center">
            <Smartphone className="size-3 mr-1" />
            {contact?.contact_phone}
          </p>

          <p className="text-md font-normal flex items-center">
            <Mail className="size-3 mr-1" /> {contact?.contact_email}
          </p>
          <p className="text-md font-normal flex items-center">
            <MapPin className="size-3 mr-1" /> {contact?.contact_city}
          </p>
        </div>
        <div className="pt-2 ">
          <p className="text-md font-normal flex items-center">
            <Linkedin className="size-3 mr-1" /> {contact?.contact_linkedin}
          </p>
        </div>
      </header>

      <section className="py-2">
        <h2 className="text-xl font-medium text-honoluluBlue border-b border-honoluluBlue pb-1">
          Professional Summary
        </h2>
        <p className="text-md mt-2 text-justify">{profileSummary}</p>
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
            <div>
              <div className="flex">
                <span className="text-md font-normal">
                  {edu?.education_major}

                  {edu?.education_specialization && (
                    <span className="text-md font-normal">
                      {" | "}
                      <span className="font-semibold">
                        Specialization:
                      </span>{" "}
                      {edu?.education_specialization}
                    </span>
                  )}

                  {edu?.education_achievement && (
                    <span className="text-md font-normal">
                      {" | "}
                      <span className="font-semibold">Achivements:</span>{" "}
                      {edu?.education_achievement}
                    </span>
                  )}
                </span>
              </div>

              {/* add coursework things here */}
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size={"sm"}
              className={
                "bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue"
              }
            >
              Downlod resume
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <h2 className="text-lg font-semibold mb-4">Download Options</h2>
              </AlertDialogTitle>

              <AlertDialogDescription>
                <p className="mb-6">
                  Select your preferred format to download your content:
                </p>

                <div className="flex justify-between gap-4">
                  <button
                    onClick={generatePdfFile}
                    className="w-full  text-black py-2 px-4 rounded hover:bg-red-200 transition duration-200 border"
                  >
                    <div className="flex items-center justify-center flex-col">
                      <Image
                        src={"/images/pdf-file.svg"}
                        height={400}
                        width={400}
                        alt="word file"
                        className="w-24 h-auto"
                      />
                      <p>Download as PDF</p>
                    </div>
                  </button>
                  <button
                    onClick={generateWordFile}
                    className="w-full  text-black py-2 px-4 rounded hover:bg-blue-200 transition duration-200 border"
                  >
                    <div className="flex items-center justify-center flex-col">
                      <Image
                        src={"/images/word-file.svg"}
                        height={400}
                        width={400}
                        alt="word file"
                        className="w-24 h-auto"
                      />
                      <p>Download as Word</p>
                    </div>
                  </button>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="absolute top-2 right-2">
                <X className="size-4" />
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </footer>
    </div>
  );
};
