import { gql } from "@apollo/client";

export const EXPERIENCE_INFORMATION = gql`
  subscription experienceInformation {
    experience {
      company_end_date
      company_location
      company_name
      company_role
      company_role_description
      company_start_date
      id
      user_id
    }
  }
`;

export const ADD_NEW_EXPERIENCE = gql`
  mutation addNewExperience(
    $company_end_date: String
    $company_location: String
    $company_name: String
    $company_role: String
    $company_role_description: String
    $company_start_date: String
    $user_id: String
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
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_EXPERIENCE_BY_ID = gql`
  mutation updaateExperienceById(
    $company_end_date: String
    $company_location: String
    $company_name: String
    $company_role: String
    $company_role_description: String
    $company_start_date: String
    $_eq: uuid
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
      }
    ) {
      affected_rows
    }
  }
`;
