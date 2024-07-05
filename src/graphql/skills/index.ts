import { gql } from "@apollo/client";

export const SKILLS_INFORMATION_BY_USER_ID = gql`
  subscription skillsInformationByUserId($_eq: String) {
    skill(where: { user_id: { _eq: $_eq } }) {
      id
      skill_name
      user_id
    }
  }
`;

export const ADD_NEW_SKILL_BY_USER_ID = gql`
  mutation addNeSkillByUserId($skill_name: String, $user_id: String) {
    insert_skill(objects: { skill_name: $skill_name, user_id: $user_id }) {
      affected_rows
    }
  }
`;

export const UPDATE_SKILL_BY_ID = gql`
  mutation updateSummaryById($skill_name: String, $_eq: uuid!) {
    update_skill(
      where: { id: { _eq: $_eq } }
      _set: { skill_name: $skill_name }
    ) {
      affected_rows
    }
  }
`;
