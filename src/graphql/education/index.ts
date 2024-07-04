import { gql } from "@apollo/client";

export const EDUCATION_INFORMATION_BY_USER_ID = gql`
  subscription educationInformation($_eq: String) {
    education(where: { user_id: { _eq: $_eq } }) {
      education_completion_year
      education_gpa
      education_institute
      education_location
      education_major
      education_minor
      educatoin_additional_information
      id
      visibility
      user_id
    }
  }
`;

export const VIEW_EDUCATION_BY_ID = gql`
  subscription viewEducationById($_eq: uuid!) {
    education(where: { id: { _eq: $_eq } }) {
      education_completion_year
      education_gpa
      education_institute
      education_location
      education_major
      education_minor
      educatoin_additional_information
      id
      user_id
      visibility
    }
  }
`;

export const ADD_NEW_EDUCATION_BY_USER_ID = gql`
  mutation addNewEducationByUserId(
    $education_completion_year: String
    $education_gpa: String
    $education_institute: String
    $education_location: String
    $education_major: String
    $education_minor: String
    $educatoin_additional_information: String
    $user_id: String
  ) {
    insert_education(
      objects: {
        education_completion_year: $education_completion_year
        education_gpa: $education_gpa
        education_institute: $education_institute
        education_location: $education_location
        education_major: $education_major
        education_minor: $education_minor
        educatoin_additional_information: $educatoin_additional_information
        user_id: $user_id
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_EDUCATION_BY_ID = gql`
  mutation updateEducationById(
    $education_completion_year: String
    $education_gpa: String
    $education_institute: String
    $education_location: String
    $education_major: String
    $education_minor: String
    $educatoin_additional_information: String
    $_eq: uuid!
  ) {
    update_education(
      where: { id: { _eq: $_eq } }
      _set: {
        education_completion_year: $education_completion_year
        education_gpa: $education_gpa
        education_institute: $education_institute
        education_location: $education_location
        education_major: $education_major
        education_minor: $education_minor
        educatoin_additional_information: $educatoin_additional_information
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_EDUCATION_BY_PK = gql`
  mutation deleteEducationByPk($id: uuid!) {
    delete_education_by_pk(id: $id) {
      education_completion_year
      education_gpa
      education_institute
      education_location
      education_major
      education_minor
      educatoin_additional_information
      user_id
      id
    }
  }
`;

export const HIDE_EDUCATION_BY_PK = gql`
  mutation hideEducationByPk($visibility: Boolean = false, $id: uuid!) {
    update_education_by_pk(
      pk_columns: { id: $id }
      _set: { visibility: $visibility }
    ) {
      visibility
    }
  }
`;
