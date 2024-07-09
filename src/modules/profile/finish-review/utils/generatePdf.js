import MyPdfDocument from "@/modules/shared/components/pdf-viewer/my-document";
import { pdf } from "@react-pdf/renderer";

export const generatePdfBlob = async (customComponent) => {
  const blob = await pdf(
    <MyPdfDocument customComponent={customComponent} />
  ).toBlob();
  return blob;
};
