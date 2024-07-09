import {gql} from "@apollo/client";

export const SKILLS_INFORMATION_BY_USER_ID = gql`
  subscription skillsInformationByUserId($_eq: String) {
    skill(where: { user_id: { _eq: $_eq } }) {
      id
      interests
      language_skills
      other_skills
      technical_skills
      user_id
    }
  }
`;

export const ADD_NEW_SKILL_BY_USER_ID = gql`
  mutation addNeSkillByUserId(
    $interests: String
    $language_skills: String
    $other_skills: String
    $technical_skills: String
    $user_id: String
  ) {
    insert_skill(
      objects: {
        interests: $interests
        language_skills: $language_skills
        other_skills: $other_skills
        technical_skills: $technical_skills
        user_id: $user_id
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_SKILL_BY_ID = gql`
  mutation updateSummaryById(
    $_eq: uuid!
    $interests: String
    $language_skills: String
    $other_skills: String
    $technical_skills: String
  ) {
    update_skill(
      where: { id: { _eq: $_eq } }
      _set: {
        interests: $interests
        language_skills: $language_skills
        other_skills: $other_skills
        technical_skills: $technical_skills
      }
    ) {
      affected_rows
    }
  }
`;
