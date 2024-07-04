import React, { ReactNode } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

interface Props {
  customComponent: ReactNode;
}
const MyPdfDocument = ({ customComponent }: Props) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>My PDF Document</Text>
        <View style={styles.section}>{customComponent}</View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default MyPdfDocument;
