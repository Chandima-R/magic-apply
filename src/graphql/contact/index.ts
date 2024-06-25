import { gql } from "@apollo/client";

export const CONTACT_INFORMATION = gql`
  subscription contactInformation {
    contact {
      contact_city
      contact_country
      contact_email
      contact_linkedin
      contact_name
      contact_phone
      contact_state
      contact_website
      id
      user_id
    }
  }
`;

export const ADD_NEW_CONTACT = gql`
  mutation addNewContact(
    $contact_city: String
    $contact_country: String
    $contact_email: String
    $contact_linkedin: String
    $contact_name: String
    $contact_phone: String
    $contact_state: String
    $contact_website: String
    $user_id: String
  ) {
    insert_contact(
      objects: {
        contact_city: $contact_city
        contact_country: $contact_country
        contact_email: $contact_email
        contact_linkedin: $contact_linkedin
        contact_name: $contact_name
        contact_phone: $contact_phone
        contact_state: $contact_state
        contact_website: $contact_website
        user_id: $user_id
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation updateContact(
    $contact_website: String
    $contact_state: String
    $contact_phone: String
    $contact_name: String
    $contact_linkedin: String
    $contact_email: String
    $contact_country: String
    $contact_city: String
    $_eq: uuid
  ) {
    update_contact(
      where: { id: { _eq: $_eq } }
      _set: {
        contact_city: $contact_city
        contact_country: $contact_country
        contact_email: $contact_email
        contact_linkedin: $contact_linkedin
        contact_name: $contact_name
        contact_phone: $contact_phone
        contact_state: $contact_state
        contact_website: $contact_website
      }
    ) {
      affected_rows
    }
  }
`;
