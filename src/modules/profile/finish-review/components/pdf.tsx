import React, { useState, useEffect } from "react";
import CustomComponent from "./custom-component";
import { generatePdfBlob } from "@/utils/generatePdf";
import PdfViewer from "./pdf-viewer";

const PdfPage = () => {
  const [pdfBlob, setPdfBlob] = useState<any>(null);

  useEffect(() => {
    const customComponent = <CustomComponent />;
    generatePdfBlob(customComponent).then(setPdfBlob);
  }, []);

  return (
    <div>
      <h1>PDF Viewer</h1>
      {pdfBlob ? <PdfViewer pdfBlob={pdfBlob} /> : "Generating PDF..."}
    </div>
  );
};

export default PdfPage;
