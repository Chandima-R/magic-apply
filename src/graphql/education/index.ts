import { gql } from "@apollo/client";

export const EDUCATION_INFORMATION_BY_USER_ID = gql`
  subscription educationInformation($_eq: String) {
    education(
      where: { user_id: { _eq: $_eq } }
      order_by: { education_end_date: desc }
    ) {
      education_achievement
      education_start_date
      education_end_date
      education_gpa
      education_institute
      education_location
      education_major
      education_specialization
      education_coursework
      educatoin_additional_information
      id
      visibility
      user_id
      isCurrent
    }
  }
`;

export const VIEW_EDUCATION_BY_ID = gql`
  subscription viewEducationById($_eq: uuid!) {
    education(where: { id: { _eq: $_eq } }) {
      education_achievement
      education_start_date
      education_end_date
      education_gpa
      education_institute
      education_location
      education_major
      education_specialization
      education_coursework
      educatoin_additional_information
      id
      user_id
      visibility
      isCurrent
    }
  }
`;

export const ADD_NEW_EDUCATION_BY_USER_ID = gql`
  mutation addNewEducationByUserId(
    $education_achievement: String
    $education_start_date: String
    $education_end_date: String
    $education_gpa: String
    $education_institute: String
    $education_location: String
    $education_major: String
    $education_specialization: String
    $education_coursework: String
    $educatoin_additional_information: String
    $user_id: String
    $isCurrent: Boolean!
  ) {
    insert_education(
      objects: {
        education_achievement: $education_achievement
        education_start_date: $education_start_date
        education_end_date: $education_end_date
        education_gpa: $education_gpa
        education_institute: $education_institute
        education_location: $education_location
        education_major: $education_major
        education_specialization: $education_specialization
        education_coursework: $education_coursework
        educatoin_additional_information: $educatoin_additional_information
        user_id: $user_id
        isCurrent: $isCurrent
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_EDUCATION_BY_ID = gql`
  mutation updateEducationById(
    $education_achievement: String
    $education_start_date: String
    $education_end_date: String
    $education_gpa: String
    $education_institute: String
    $education_location: String
    $education_major: String
    $education_specialization: String
    $education_coursework: String
    $educatoin_additional_information: String
    $_eq: uuid!
    $isCurrent: Boolean!
  ) {
    update_education(
      where: { id: { _eq: $_eq } }
      _set: {
        education_achievement: $education_achievement
        education_start_date: $education_start_date
        education_end_date: $education_end_date
        education_gpa: $education_gpa
        education_institute: $education_institute
        education_location: $education_location
        education_major: $education_major
        education_specialization: $education_specialization
        education_coursework: $education_coursework
        educatoin_additional_information: $educatoin_additional_information
        isCurrent: $isCurrent
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_EDUCATION_BY_PK = gql`
  mutation deleteEducationByPk($id: uuid!) {
    delete_education_by_pk(id: $id) {
      education_achievement
      education_start_date
      education_end_date
      education_gpa
      education_institute
      education_location
      education_major
      education_specialization
      education_coursework
      educatoin_additional_information
      user_id
      id
      isCurrent
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
