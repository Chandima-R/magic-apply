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
  const technicalSkills = skills?.technical_skills
    ?.split(",")
    .map((skill: string) => skill.trim());
  const otherSkills = skills?.technical_skills
    ?.split(",")
    .map((skill: string) => skill.trim());
  const lnguageSkills = skills?.technical_skills
    ?.split(",")
    .map((skill: string) => skill.trim());
  const interests = skills?.technical_skills
    ?.split(",")
    .map((skill: string) => skill.trim());

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>{contact?.contact_name}</Text>
        <View style={styles.headerContent}>
          <Text style={styles.headerContentText}>
            Telephone: {contact?.contact_phone}
          </Text>

          <Text style={styles.headerContentText}>
            Email: {contact?.contact_email}
          </Text>

          <Text style={styles.headerContentText}>
            Location: {contact?.contact_city}
          </Text>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.headerContentText}>
            LinkedIn: {contact?.contact_linkedin}
          </Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionContainerTitle}>professional summary</Text>
        <View>
          <Text style={styles.sectionContainerDescription}>
            {summary?.summary_description}
          </Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionContainerTitle}>experience</Text>

        {experience?.map((exp: any) => (
          <View style={styles.specialSectionItem}>
            {!exp?.company_end_date ? (
              <View key={exp.id} style={styles.sectionItem}>
                <View style={styles.sectionItemTitle}>
                  <View style={styles.sectionItemTitleLeft}>
                    <Text style={styles.sectionItemTitleText}>
                      {exp?.company_role}
                    </Text>
                    <Text style={styles.sectionItemTitleSpan}>
                      , {exp?.company_name}
                    </Text>
                    <Text style={styles.sectionItemTitleSpan}>
                      , {exp?.company_location}
                    </Text>
                  </View>

                  <View style={styles.sectionItemContentBlock}>
                    <Text style={styles.sectionItemContentBlockText}>
                      {format(exp?.company_start_date, "MMM, yyyy")}
                    </Text>
                    <Text style={styles.sectionItemContentBlockText}>
                      {" "}
                      {" - "}{" "}
                    </Text>

                    <Text style={styles.sectionItemContentBlockText}>
                      Current
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={styles.sectionItemDescription}>
                    <View style={styles.sectionItemDescriptionDot} />
                    <Text style={styles.sectionItemDescriptionText}>
                      {exp?.company_role_description}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View key={exp.id} style={styles.sectionItem}>
                <View style={styles.sectionItemTitle}>
                  <View style={styles.sectionItemTitleLeft}>
                    <Text style={styles.sectionItemTitleText}>
                      {exp?.company_role}
                    </Text>
                    <Text style={styles.sectionItemTitleSpan}>
                      , {exp?.company_name}
                    </Text>
                    <Text style={styles.sectionItemTitleSpan}>
                      , {exp?.company_location}
                    </Text>
                  </View>

                  <View style={styles.sectionItemContentBlock}>
                    <Text style={styles.sectionItemContentBlockText}>
                      {format(exp?.company_start_date, "MMM, yyyy")}
                    </Text>
                    <Text style={styles.sectionItemContentBlockText}>
                      {" "}
                      {" - "}{" "}
                    </Text>

                    <Text style={styles.sectionItemContentBlockText}>
                      {format(exp?.company_end_date, "MMM, yyyy")}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={styles.sectionItemDescription}>
                    <View style={styles.sectionItemDescriptionDot} />
                    <Text style={styles.sectionItemDescriptionText}>
                      {exp?.company_role_description}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionContainerTitle}>Education</Text>
        {education?.map((edu: any) => (
          <View key={edu.id} style={styles.sectionItem}>
            <View style={styles.sectionItemTitle}>
              <View style={styles.sectionItemTitleLeft}>
                <Text style={styles.sectionItemTitleText}>
                  {edu?.education_institute}
                </Text>
                <Text style={styles.sectionItemTitleSpan}>
                  , {edu?.education_location}
                </Text>
              </View>

              <View style={styles.sectionItemContentBlock}>
                <Text style={styles.sectionItemContentBlockText}>
                  {format(edu?.education_start_date, "MMM, yyyy")}
                </Text>
                <Text style={styles.sectionItemContentBlockText}>
                  {" "}
                  {" - "}{" "}
                </Text>

                <Text style={styles.sectionItemContentBlockText}>
                  {format(edu?.education_end_date, "MMM, yyyy")}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.sectionItemContent}>
                <Text style={styles.sectionItemContentHeader}>
                  {edu?.education_major}
                  {edu?.education_specialization ? (
                    <View>Specialization: {edu?.education_specialization}</View>
                  ) : (
                    ""
                  )}
                </Text>
              </View>
              <View style={styles.sectionItemDescription}>
                {edu?.educatoin_additional_information > 0 && (
                  <View>
                    <View style={styles.sectionItemDescriptionDot} />
                    <Text style={styles.sectionItemDescriptionText}>
                      {edu?.educatoin_additional_information.length > 0
                        ? edu?.educatoin_additional_information
                        : ""}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionContainerTitle}>
          Additional Experience and Achievements (Projects and Involvements)
        </Text>
        {project?.map((pro: any) => (
          <View key={pro.id} style={styles.sectionItem}>
            <View style={styles.sectionItemTitle}>
              <View style={styles.sectionItemTitleLeft}>
                <Text style={styles.sectionItemTitleText}>
                  {pro?.project_name}
                </Text>
                <Text style={styles.sectionItemTitleSpan}>
                  , {pro?.project_organization}
                </Text>
              </View>
              <View style={styles.sectionItemContentBlock}>
                <Text style={styles.sectionItemContentBlockText}>
                  {format(pro?.project_start_date, "MMM, yyyy")}
                </Text>
                <Text style={styles.sectionItemContentBlockText}>
                  {" "}
                  {" - "}{" "}
                </Text>
                <Text style={styles.sectionItemContentBlockText}>
                  {format(pro?.project_end_date, "MMM, yyyy")}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.sectionItemDescription}>
                <View style={styles.sectionItemDescriptionDot} />
                <Text style={styles.sectionItemDescriptionText}>
                  {pro?.project_role_description.length > 0
                    ? pro?.project_role_description
                    : ""}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {involvement?.map((inv: any) => (
          <View key={inv.id} style={styles.sectionItem}>
            <View style={styles.sectionItemTitle}>
              <View style={styles.sectionItemTitleLeft}>
                <Text style={styles.sectionItemTitleText}>
                  {inv?.involvement_organization_role}
                </Text>
                <Text style={styles.sectionItemTitleSpan}>
                  , {inv?.involevement_organization}
                </Text>
              </View>
              <View style={styles.sectionItemContentBlock}>
                <Text style={styles.sectionItemContentBlockText}>
                  {format(inv?.involvement_start_date, "MMM, yyyy")}
                </Text>
                <Text style={styles.sectionItemContentBlockText}>
                  {" "}
                  {" - "}{" "}
                </Text>
                <Text style={styles.sectionItemContentBlockText}>
                  {format(inv?.involvement_end_date, "MMM, yyyy")}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.sectionItemContent}>
                <Text style={styles.sectionItemContentHeader}>
                  {inv?.involvement_college}
                </Text>
              </View>
              <View style={styles.sectionItemDescription}>
                <View style={styles.sectionItemDescriptionDot} />
                <Text style={styles.sectionItemDescriptionText}>
                  {inv?.involvement_description.length > 0
                    ? inv?.involvement_description
                    : ""}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionContainerTitle}>
          Skills, Languages and Interests
        </Text>

        <View style={styles.sectionItemHorizontalView}>
          <View style={styles.sectionItem}>
            <View style={styles.sectionItemTitle}>
              <View style={styles.sectionItemTitle}>
                <Text style={styles.sectionItemTitleText}>
                  Technical Skills
                </Text>
              </View>
            </View>
            <View>
              {technicalSkills?.map((skill: any, index: number) => (
                <View key={index} style={styles.sectionItemContentGrid}>
                  <Text style={styles.sectionItemContentHeader}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sectionItem}>
            <View style={styles.sectionItemTitle}>
              <View style={styles.sectionItemTitle}>
                <Text style={styles.sectionItemTitleText}>Other Skills</Text>
              </View>
            </View>
            <View>
              {otherSkills?.map((skill: any, index: number) => (
                <View key={index} style={styles.sectionItemContentGrid}>
                  <Text style={styles.sectionItemContentHeader}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sectionItem}>
            <View style={styles.sectionItemTitle}>
              <View style={styles.sectionItemTitle}>
                <Text style={styles.sectionItemTitleText}>Languages</Text>
              </View>
            </View>
            <View>
              {lnguageSkills?.map((skill: any, index: number) => (
                <View key={index} style={styles.sectionItemContentGrid}>
                  <Text style={styles.sectionItemContentHeader}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sectionItem}>
            <View style={styles.sectionItemTitle}>
              <View style={styles.sectionItemTitle}>
                <Text style={styles.sectionItemTitleText}>Interests</Text>
              </View>
            </View>
            <View>
              {interests?.map((skill: any, index: number) => (
                <View key={index} style={styles.sectionItemContentGrid}>
                  <Text style={styles.sectionItemContentHeader}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
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
    paddingBottom: "10px",
  },

  headerTitle: {
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "5px",
  },

  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "20px",
    flexDirection: "row",
  },

  headerContentText: {
    fontWeight: 300,
    fontSize: "10px",
  },

  horizontalBar: {
    height: "10px",
    backgroundColor: "black",
    width: "0.5px",
  },

  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: "10px",
    paddingBottom: "10px",
  },

  sectionHeader: {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "5px",
  },

  sectionContainerTitle: {
    fontSize: "14px",
    textTransform: "capitalize",
    fontWeight: 400,
    marginBottom: "2px",
    borderBottom: "0.5px",
    borderColor: "#0077BB",
    paddingVertical: "1px",
    width: "100%",
    color: "#0077BB",
  },

  sectionContainerDescription: {
    fontSize: "10px",
    fontWeight: 400,
    textAlign: "justify",
  },

  sectionItem: {
    marginBottom: "10px",
    width: "100%",
  },

  sectionItemTitle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  sectionItemTitleLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  sectionItemTitleText: {
    fontSize: "12px",
    fontWeight: 300,
    textTransform: "capitalize",
    marginVertical: "5px",
  },

  sectionItemTitleSpan: {
    fontSize: "10px",
    fontWeight: 300,
    textTransform: "capitalize",
    marginVertical: "5px",
  },

  sectionItemContent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5px",
  },

  sectionItemContentGrid: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sectionItemContentHeader: {
    fontSize: "10px",
    fontWeight: 500,
    textTransform: "capitalize",
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
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "justify",
  },

  sectionItemDescriptionDot: {
    width: "5px",
    height: "5px",
    borderRadius: "10px",
    marginRight: "4px",
    backgroundColor: "#0077BB",
    marginTop: "3px",
  },

  sectionItemDescriptionText: {
    fontSize: "10px",
  },

  specialSectionItem: {
    width: "100%",
  },

  sectionItemHorizontalView: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
});

export default CustomComponent;
