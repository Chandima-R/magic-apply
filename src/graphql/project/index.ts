import { gql } from "@apollo/client";

export const PROJECT_INFORMATION_BY_USER_ID = gql`
  subscription projectInformation($_eq: String) {
    project(
      where: { user_id: { _eq: $_eq } }
      order_by: { project_end_date: desc }
    ) {
      id
      project_end_date
      project_name
      project_organization
      project_location
      project_role_description
      project_start_date
      project_url
      user_id
      visibility
      isCurrent
    }
  }
`;

export const VIEW_PROJECT_BY_ID = gql`
  subscription viewProjectById($_eq: uuid!) {
    project(where: { id: { _eq: $_eq } }) {
      id
      project_end_date
      project_name
      project_organization
      project_location
      project_role_description
      project_start_date
      project_url
      user_id
      visibility
      isCurrent
    }
  }
`;

export const ADD_NEW_PROJECT_BY_USER_ID = gql`
  mutation addNewProjectByUserId(
    $user_id: String
    $project_url: String
    $project_start_date: String
    $project_role_description: String
    $project_organization: String
    $project_location: String
    $project_name: String
    $project_end_date: String
    $isCurrent: Boolean!
  ) {
    insert_project(
      objects: {
        user_id: $user_id
        project_url: $project_url
        project_start_date: $project_start_date
        project_role_description: $project_role_description
        project_organization: $project_organization
        project_location: $project_location
        project_name: $project_name
        project_end_date: $project_end_date
        isCurrent: $isCurrent
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_PROJECT_BY_ID = gql`
  mutation updateProjectById(
    $project_end_date: String
    $project_name: String
    $project_organization: String
    $project_location: String
    $project_role_description: String
    $project_start_date: String
    $project_url: String
    $_eq: uuid
    $isCurrent: Boolean!
  ) {
    update_project(
      where: { id: { _eq: $_eq } }
      _set: {
        project_end_date: $project_end_date
        project_name: $project_name
        project_organization: $project_organization
        project_location: $project_location
        project_role_description: $project_role_description
        project_start_date: $project_start_date
        project_url: $project_url
        isCurrent: $isCurrent
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_PROJECT_BY_PK = gql`
  mutation deleteProjectByPk($id: uuid!) {
    delete_project_by_pk(id: $id) {
      id
      project_end_date
      project_name
      project_organization
      project_location
      project_role_description
      project_start_date
      project_url
      user_id
      visibility
      isCurrent
    }
  }
`;

export const HIDE_PROJECT_BY_PK = gql`
  mutation hideProjectByPk($id: uuid!, $visibility: Boolean = false) {
    update_project_by_pk(
      pk_columns: { id: $id }
      _set: { visibility: $visibility }
    ) {
      visibility
    }
  }
`;
