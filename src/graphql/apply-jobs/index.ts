import { gql } from "@apollo/client";

export const APPLY_JOBS_INFORMATION_BY_USER_ID = gql`
  subscription applyJobsInformationByUserId($_eq: String) {
    apply_jobs(where: { user_id: { _eq: $_eq } }) {
      user_id
      job_description
      cover_letter
      id
      company_description
      additional_question_one
      additional_question_two
      additional_question_three
      additional_information
      custom_input
      file_upload
      custom_text
      master_resume
      cover_letters {
        letter
      }
    }
  }
`;

export const ADD_NEW_APPLY_JOBS_ROW_BY_USER_ID = gql`
  mutation addNewApplyJobsRowByUserId(
    $additional_information: String
    $additional_question_one: String
    $additional_question_three: String
    $additional_question_two: String
    $company_description: String
    $cover_letter: Boolean = false
    $job_description: String
    $master_resume: Boolean = false
    $custom_input: String
    $custom_text: String
    $file_upload: String
    $user_id: String
  ) {
    insert_apply_jobs(
      objects: {
        additional_information: $additional_information
        additional_question_one: $additional_question_one
        additional_question_three: $additional_question_three
        additional_question_two: $additional_question_two
        company_description: $company_description
        cover_letter: $cover_letter
        job_description: $job_description
        master_resume: $master_resume
        custom_input: $custom_input
        custom_text: $custom_text
        file_upload: $file_upload
        user_id: $user_id
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_APPLY_JOBS_ROW_BY_USER_ID = gql`
  mutation updateApplyJobsRowByUserId(
    $additional_information: String
    $additional_question_one: String
    $additional_question_three: String
    $additional_question_two: String
    $company_description: String
    $cover_letter: Boolean = false
    $job_description: String
    $master_resume: Boolean = false
    $custom_input: String
    $custom_text: String
    $file_upload: String
    $user_id: String
    $_eq: uuid!
  ) {
    update_apply_jobs(
      where: { id: { _eq: $_eq } }
      _set: {
        additional_information: $additional_information
        additional_question_one: $additional_question_one
        additional_question_three: $additional_question_three
        additional_question_two: $additional_question_two
        company_description: $company_description
        cover_letter: $cover_letter
        job_description: $job_description
        master_resume: $master_resume
        custom_input: $custom_input
        custom_text: $custom_text
        file_upload: $file_upload
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_APPLY_JOBS_ROW_BY_PK = gql`
  mutation deleteApplyJobsRowByPk($_eq: uuid!) {
    delete_apply_jobs(where: { id: { _eq: $_eq } }) {
      affected_rows
      returning {
        user_id
        job_description
        cover_letter
        id
        company_description
        additional_question_one
        additional_question_two
        additional_question_three
        additional_information
        custom_input
        file_upload
        custom_text
        master_resume
      }
    }
  }
`;
