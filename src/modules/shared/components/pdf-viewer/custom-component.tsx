import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

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

const CustomComponent = ({
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
  console.log(
    certificate,
    contact,
    coursework,
    education,
    experience,
    involvement,
    project,
    skills,
    summary
  );

  console.log(12, project);

  const skillArr = skills?.skill_name?.split(",");

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>{contact?.contact_name}</Text>
        <View style={styles.headerContent}>
          <Text style={styles.headerContentText}>{contact?.contact_city}</Text>
          <Text style={styles.headerContentText}>{contact?.contact_email}</Text>
          <Text style={styles.headerContentText}>{contact?.contact_phone}</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionContainerTitle}>summary</Text>
        <View>
          <Text style={styles.sectionContainerDescription}>
            {summary?.summary_description}
          </Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionContainerTitle}>experience</Text>
        {experience?.map((exp: any) => (
          <View key={exp.id} style={styles.sectionItem}>
            <View>
              <Text style={styles.sectionItemTitle}>{exp?.company_role}</Text>
            </View>
            <View>
              <View style={styles.sectionItemContent}>
                <Text style={styles.sectionItemContentHeader}>
                  {exp?.company_name}
                </Text>
                <View style={styles.sectionItemContentBlock}>
                  <Text style={styles.sectionItemContentBlockText}>
                    {format(exp?.company_start_date, "dd MMMM, yyyy")}
                  </Text>
                  <Text style={styles.sectionItemContentBlockText}> - </Text>
                  <Text style={styles.sectionItemContentBlockText}>
                    {format(exp?.company_end_date, "dd MMMM, yyyy")}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.sectionItemDescription}>
                  {exp?.company_role_description}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionContainerTitle}>projects</Text>
        {project?.map((pro: any) => (
          <View key={pro.id} style={styles.sectionItem}>
            <View>
              <Text style={styles.sectionItemTitle}>
                {pro?.project_organization}
              </Text>
            </View>
            <View>
              <View style={styles.sectionItemContent}>
                <Text style={styles.sectionItemContentHeader}>
                  {pro?.project_name}
                </Text>
                <View style={styles.sectionItemContentBlock}>
                  <Text style={styles.sectionItemContentBlockText}>
                    {format(pro?.project_start_date, "dd MMMM, yyyy")}
                  </Text>
                  <Text style={styles.sectionItemContentBlockText}> - </Text>
                  <Text style={styles.sectionItemContentBlockText}>
                    {format(pro?.project_end_date, "dd MMMM, yyyy")}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.sectionItemDescription}>
                  {pro?.project_role_description}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  headerSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "0.5px",
    paddingBottom: "10px",
    borderColor: "gray",
  },

  headerTitle: {
    fontSize: "18px",
    fontWeight: 700,
    marginBottom: "5px",
  },

  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    flexDirection: "row",
  },

  headerContentText: {
    fontWeight: 300,
    fontSize: "10px",
  },

  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: "10px",
    borderBottom: "0.5px",
    paddingBottom: "10px",
    borderColor: "gray",
  },

  sectionHeader: {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "5px",
  },

  sectionContainerTitle: {
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: 400,
    marginBottom: "5px",
  },

  sectionContainerDescription: {
    fontSize: "10px",
    fontWeight: 400,
  },

  sectionItem: {},

  sectionItemTitle: {
    fontSize: "14px",
    fontWeight: 500,
    textTransform: "uppercase",
    marginBottom: "5px",
  },

  sectionItemContent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5px",
  },

  sectionItemContentHeader: {
    fontSize: "14px",
    fontWeight: 400,
  },

  sectionItemContentBlock: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sectionItemContentBlockText: {
    fontSize: "10px",
  },

  sectionItemDescription: {
    fontSize: "11px",
  },
});

export default CustomComponent;
