import { gql } from "@apollo/client";

export const CERTIFICATE_INFORMATION_BY_USER_ID = gql`
  subscription summaryInformationByUserId($_eq: String) {
    summary(where: { user_id: { _eq: $_eq } }) {
      id
      summary_description
      user_id
    }
  }
`;

export const ADD_NEW_SUMMARY_BY_USER_ID = gql`
  mutation addNewSummaryByUserId(
    $summary_description: String
    $user_id: String
  ) {
    insert_summary(
      objects: { summary_description: $summary_description, user_id: $user_id }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_SUMMARY_BY_ID = gql`
  mutation updateSummaryById($summary_description: String, $_eq: uuid!) {
    update_summary(
      where: { id: { _eq: $_eq } }
      _set: { summary_description: $summary_description }
    ) {
      affected_rows
    }
  }
`;
