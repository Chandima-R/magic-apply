import { gql } from "@apollo/client";

export const INVOLVEMENT_INFORMATION_BY_USER_ID = gql`
  subscription involvementInformationByUserId($_eq: String) {
    involvement(
      where: { user_id: { _eq: $_eq } }
      order_by: { involvement_end_date: desc }
    ) {
      involevement_organization
      id
      involvement_college
      involvement_description
      involvement_end_date
      involvement_organization_role
      involvement_start_date
      involvement_location
      user_id
      visibility
      isCurrent
    }
  }
`;

export const VIEW_INVOLVEMENT_BY_ID = gql`
  subscription viewInvolvementById($_eq: uuid!) {
    involvement(where: { id: { _eq: $_eq } }) {
      id
      involevement_organization
      involvement_college
      involvement_description
      involvement_end_date
      involvement_organization_role
      involvement_start_date
      involvement_location
      user_id
      visibility
      isCurrent
    }
  }
`;

export const ADD_NEW_INVOLVEMENT_BY_USER_ID = gql`
  mutation addNewInvolvementByUserId(
    $involevement_organization: String
    $involvement_college: String
    $involvement_description: String
    $involvement_end_date: String
    $involvement_organization_role: String
    $involvement_start_date: String
    $involvement_location: String
    $user_id: String
    $isCurrent: Boolean
  ) {
    insert_involvement(
      objects: {
        involevement_organization: $involevement_organization
        involvement_college: $involvement_college
        involvement_description: $involvement_description
        involvement_end_date: $involvement_end_date
        involvement_organization_role: $involvement_organization_role
        involvement_start_date: $involvement_start_date
        involvement_location: $involvement_location
        user_id: $user_id
        isCurrent: $isCurrent
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_INVOLVEMENT_BY_ID = gql`
  mutation updateInvolvementById(
    $involevement_organization: String
    $involvement_college: String
    $involvement_description: String
    $involvement_end_date: String
    $involvement_organization_role: String
    $involvement_start_date: String
    $involvement_location: String
    $_eq: uuid!
    $isCurrent: Boolean
  ) {
    update_involvement(
      where: { id: { _eq: $_eq } }
      _set: {
        involevement_organization: $involevement_organization
        involvement_college: $involvement_college
        involvement_description: $involvement_description
        involvement_end_date: $involvement_end_date
        involvement_organization_role: $involvement_organization_role
        involvement_start_date: $involvement_start_date
        involvement_location: $involvement_location
        isCurrent: $isCurrent
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_INVOLVEMENT_BY_PK = gql`
  mutation deleteInvlvementByPk($id: uuid!) {
    delete_involvement_by_pk(id: $id) {
      id
      involevement_organization
      involvement_college
      involvement_description
      involvement_end_date
      involvement_organization_role
      involvement_start_date
      involvement_location
      user_id
      isCurrent
    }
  }
`;

export const HIDE_INVOLVEMENT_BY_PK = gql`
  mutation hideInvolvementByPk($id: uuid!, $visibility: Boolean = false) {
    update_involvement_by_pk(
      pk_columns: { id: $id }
      _set: { visibility: $visibility }
    ) {
      visibility
    }
  }
`;
