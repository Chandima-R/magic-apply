import { gql } from "@apollo/client";

export const COURSEWORK_INFORMATION_BY_USER_ID = gql`
  subscription courseworkInformationByUser_id($_eq: String) {
    coursework(where: { user_id: { _eq: $_eq } }) {
      course_institute
      course_name
      course_skill
      course_skill_description
      id
      user_id
      course_completion_year
      visibility
    }
  }
`;

export const ADD_NEW_COURSEWORK_BY_USER_ID = gql`
  mutation addNewCourseworkByUserId(
    $course_completion_year: String
    $course_institute: String
    $course_name: String
    $course_skill: String
    $course_skill_description: String
    $user_id: String
  ) {
    insert_coursework(
      objects: {
        course_completion_year: $course_completion_year
        course_institute: $course_institute
        course_name: $course_name
        course_skill: $course_skill
        course_skill_description: $course_skill_description
        user_id: $user_id
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_COURSEWORK_BY_ID = gql`
  mutation updateCoursewokrById(
    $course_completion_year: String
    $course_institute: String
    $course_name: String
    $course_skill: String
    $course_skill_description: String
    $_eq: uuid!
  ) {
    update_coursework(
      where: { id: { _eq: $_eq } }
      _set: {
        course_completion_year: $course_completion_year
        course_institute: $course_institute
        course_name: $course_name
        course_skill: $course_skill
        course_skill_description: $course_skill_description
      }
    )
  }
`;

export const DELETE_COURSEWORK_BY_PK = gql`
  mutation deleteCourseworkByPk($id: uuid!) {
    delete_coursework_by_pk(id: $id) {
      course_completion_year
      course_institute
      course_name
      course_skill
      course_skill_description
      id
      user_id
    }
  }
`;

export const HIDE_COURSEWORK_BY_PK = gql`
  mutation hideCourseworkByPk($id: uuid!, $visibility: Boolean = false) {
    update_coursework_by_pk(
      pk_columns: { id: $id }
      _set: { visibility: $visibility }
    ) {
      visibility
    }
  }
`;
