import { gql } from "@apollo/client";

// export const APPLY_JOBS_INFORMATION_BY_USER_ID = gql`
//   subscription applyJobsInformationByUserId($_eq: String) {
//     apply_jobs(where: { user_id: { _eq: $_eq } }) {
//       user_id
//       master_resume
//       job_description
//       id
//       cover_letter
//       company_description
//       additional_question_two
//       additional_question_three
//       additional_question_one
//       additional_information
//     }
//   }
// `;

export const VIEW_COVER_LETTER_BY_JOB_ID = gql`
  subscription MySubscription($_eq: uuid!) {
    cover_letter(where: { id: { _eq: $_eq } }) {
      apply_jobs_id
      id
      letter
      user_id
    }
  }
`;

export const ADD_NEW_COVER_LETTER_BY_JOB_ID = gql`
  mutation MyMutation(
    $apply_jobs_id: uuid!
    $user_id: String
    $letter: String
  ) {
    insert_cover_letter(
      objects: {
        user_id: $user_id
        letter: $letter
        apply_jobs_id: $apply_jobs_id
      }
    ) {
      affected_rows
    }
  }
`;

// export const UPDATE_APPLY_JOBS_ROW_BY_USER_ID = gql`
//   mutation updateApplyJobsRowByUserId(
//     $additional_information: String
//     $additional_question_one: String
//     $additional_question_three: String
//     $additional_question_two: String
//     $company_description: String
//     $cover_letter: Boolean = false
//     $job_description: String
//     $master_resume: String
//     $_eq: uuid!
//   ) {
//     update_apply_jobs(
//       where: { id: { _eq: $_eq } }
//       _set: {
//         additional_information: $additional_information
//         additional_question_one: $additional_question_one
//         additional_question_three: $additional_question_three
//         additional_question_two: $additional_question_two
//         company_description: $company_description
//         cover_letter: $cover_letter
//         job_description: $job_description
//         master_resume: $master_resume
//       }
//     ) {
//       affected_rows
//     }
//   }
// `;

// export const DELETE_APPLY_JOBS_ROW_BY_PK = gql`
//   mutation deleteApplyJobsRowByPk($_eq: uuid!) {
//     delete_apply_jobs(where: { id: { _eq: $_eq } }) {
//       affected_rows
//       returning {
//         additional_information
//         additional_question_one
//         additional_question_three
//         additional_question_two
//         company_description
//         cover_letter
//         id
//         job_description
//         master_resume
//         user_id
//       }
//     }
//   }
// `;
