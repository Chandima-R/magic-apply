import React, { useState, useEffect } from "react";
import CustomComponent from "./custom-component";
import { generatePdfBlob } from "@/modules/profile/finish-review/utils/generatePdf";
import PdfViewer from "./pdf-viewer";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";

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

const PdfPage = ({
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
  const [pdfBlob, setPdfBlob] = useState<any>(null);

  useEffect(() => {
    const customComponent = (
      <CustomComponent
        certificate={certificate}
        contact={contact}
        coursework={coursework}
        education={education}
        experience={experience}
        involvement={involvement}
        project={project}
        skills={skills}
        summary={summary}
      />
    );
    generatePdfBlob(customComponent).then(setPdfBlob);
  }, [
    certificate,
    contact,
    coursework,
    education,
    experience,
    involvement,
    project,
    skills,
    summary,
  ]);

  return (
    <div>{pdfBlob ? <PdfViewer pdfBlob={pdfBlob} /> : <LoadingSpinner />}</div>
  );
};

export default PdfPage;
