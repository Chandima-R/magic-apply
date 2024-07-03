import { gql } from "@apollo/client";

export const CERTIFICATE_INFORMATION_BY_USER_ID = gql`
  subscription certificateInformation($_eq: String) {
    certification(where: { user_id: { _eq: $_eq } }) {
      certification_completion_year
      certification_description
      visibility
      user_id
      id
      certification_name
      certification_institute
    }
  }
`;

export const ADD_NEW_CERTIFICATE_BY_USER_ID = gql`
  mutation addNewCertificateByUserId(
    $certification_completion_year: String
    $certification_description: String
    $certification_institute: String
    $certification_name: String
    $user_id: String
  ) {
    insert_certification(
      objects: {
        certification_completion_year: $certification_completion_year
        certification_description: $certification_description
        certification_institute: $certification_institute
        certification_name: $certification_name
        user_id: $user_id
      }
    ) {
      affected_rows
    }
  }
`;

export const VIEW_CERTIFICATION_BY_ID = gql`subscription MySubscription($_eq: uuid!) {
  certification(where: {id: {_eq: $_eq}}) {
    certification_completion_year
    certification_description
    certification_institute
    certification_name
    id
    user_id
    visibility
  }
}
`

export const UPDATE_CERTIFICATE_BY_ID = gql`
  mutation updateCertificateById(
    $certification_completion_year: String
    $certification_description: String
    $certification_institute: String
    $certification_name: String
    $user_id: String
    $_eq: uuid!
  ) {
    update_certification(
      where: { id: { _eq: $_eq } }
      _set: {
        certification_completion_year: $certification_completion_year
        certification_description: $certification_description
        certification_institute: $certification_institute
        certification_name: $certification_name
        user_id: $user_id
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_CERTIFICATE_BY_PK = gql`
  mutation deleteCertificateByPk($id: uuid!) {
    delete_certification_by_pk(id: $id) {
      certification_completion_year
      certification_description
      certification_institute
      certification_name
      id
      user_id
    }
  }
`;

export const HIDE_CERTIFICATE_BY_PK = gql`
  mutation hideCertificateByPk($id: uuid!, $visibility: Boolean = false) {
    update_certification_by_pk(
      pk_columns: { id: $id }
      _set: { visibility: $visibility }
    ) {
      visibility
    }
  }
`;
