import { gql } from "@apollo/client";

export const ADD_USER_BY_CLERK_ID = gql`
  mutation addUser(
    $user_email: String
    $user_firstname: String
    $user_clerk_id: String
    $user_image_url: String
    $user_lastname: String
  ) {
    insert_user(
      objects: {
        user_email: $user_email
        user_firstname: $user_firstname
        user_clerk_id: $user_clerk_id
        user_image_url: $user_image_url
        user_lastname: $user_lastname
      }
    ) {
      affected_rows
    }
  }
`;

export const GET_USER = gql`
  subscription getUser {
    user {
      id
      user_email
      user_firstname
      user_clerk_id
      user_image_url
      user_lastname
    }
  }
`;
