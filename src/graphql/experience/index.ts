import { gql } from "@apollo/client";

export const EXPERIENCE_INFORMATION_BY_USER_ID = gql`
  subscription experienceInformation($_eq: String) {
    experience(where: { user_id: { _eq: $_eq } }) {
      company_end_date
      company_location
      company_name
      company_role
      company_role_description
      company_start_date
      id
      user_id
      visibility
      isCurrent
    }
  }
`;

export const VIEW_EXPERIECE_BY_ID = gql`
  subscription viewExperienceById($_eq: uuid!) {
    experience(where: { id: { _eq: $_eq } }) {
      company_end_date
      company_location
      company_name
      company_role
      company_role_description
      company_start_date
      id
      user_id
      visibility
      isCurrent
    }
  }
`;

export const ADD_NEW_EXPERIENCE_BY_USER_ID = gql`
  mutation addNewExperience(
    $company_end_date: String
    $company_location: String
    $company_name: String
    $company_role: String
    $company_role_description: String
    $company_start_date: String
    $user_id: String
    $isCurrent: Boolean
  ) {
    insert_experience(
      objects: {
        company_end_date: $company_end_date
        company_location: $company_location
        company_name: $company_name
        company_role: $company_role
        company_role_description: $company_role_description
        company_start_date: $company_start_date
        user_id: $user_id
        isCurrent: $isCurrent
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_EXPERIENCE_BY_ID = gql`
  mutation updateExperienceById(
    $company_end_date: String
    $company_location: String
    $company_name: String
    $company_role: String
    $company_role_description: String
    $company_start_date: String
    $_eq: uuid!
    $isCurrent: Boolean
  ) {
    update_experience(
      where: { id: { _eq: $_eq } }
      _set: {
        company_end_date: $company_end_date
        company_location: $company_location
        company_name: $company_name
        company_role: $company_role
        company_role_description: $company_role_description
        company_start_date: $company_start_date
        isCurrent: $isCurrent
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_EXPERIENCE_BY_PK = gql`
  mutation deleteEperienceByPk($id: uuid!) {
    delete_experience_by_pk(id: $id) {
      company_end_date
      company_location
      company_name
      company_role
      company_role_description
      company_start_date
      id
      user_id
      isCurrent
    }
  }
`;

export const HIDE_EXPERIENCE_BY_PK = gql`
  mutation hideExperienceByPk($id: uuid!, $visibility: Boolean = false) {
    update_experience_by_pk(
      pk_columns: { id: $id }
      _set: { visibility: $visibility }
    ) {
      visibility
    }
  }
`;
