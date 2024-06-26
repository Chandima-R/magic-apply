import { gql } from "@apollo/client";

export const INVOLVEMENT_INFORMATION_BY_USER_ID = gql`
  subscription involvementInformationByUserId($_eq: String) {
    involvement(where: { user_id: { _eq: $_eq } }) {
      involevementOrganization
      id
      involvement_college
      involvement_description
      involvement_end_date
      involvement_organization_role
      involvement_start_date
      user_id
    }
  }
`;

export const ADD_NEW_INVOLVEMENT_BY_USER_ID = gql`
  mutation addNewInvolvementByUserId(
    $involevementOrganization: String
    $involvement_college: String
    $involvement_description: String
    $involvement_end_date: String
    $involvement_organization_role: String
    $involvement_start_date: String
    $user_id: String
  ) {
    insert_involvement(
      objects: {
        involevementOrganization: $involevementOrganization
        involvement_college: $involvement_college
        involvement_description: $involvement_description
        involvement_end_date: $involvement_end_date
        involvement_organization_role: $involvement_organization_role
        involvement_start_date: $involvement_start_date
        user_id: $user_id
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_INVOLVEMENT_BY_ID = gql`
  mutation updateInvolvementById(
    $involevementOrganization: String
    $involvement_college: String
    $involvement_description: String
    $involvement_end_date: String
    $involvement_organization_role: String
    $involvement_start_date: String
    $_eq: uuid!
  ) {
    update_involvement(
      where: { id: { _eq: $_eq } }
      _set: {
        involevementOrganization: $involevementOrganization
        involvement_college: $involvement_college
        involvement_description: $involvement_description
        involvement_end_date: $involvement_end_date
        involvement_organization_role: $involvement_organization_role
        involvement_start_date: $involvement_start_date
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_INVOLVEMENT_BY_PK = gql`
  mutation deleteInvolvementById($id: uuid!) {
    delete_experience_by_pk(id: $id) {
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
