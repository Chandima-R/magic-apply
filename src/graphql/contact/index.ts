import { gql } from "@apollo/client";

export const CONTACT_INFORMATION = gql`
  subscription contactInformation($_eq: String) {
    contact(where: { user_id: { _eq: $_eq } }) {
      contact_city
      contact_country
      contact_email
      contact_linkedin
      contact_name
      contact_phone
      contact_state
      contact_website
      contact_portfolio
      contact_countryCode
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
    $contact_portfolio: String
    $user_id: String
    $contact_countryCode: String
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
        contact_portfolio: $contact_portfolio
        contact_countryCode: $contact_countryCode
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
    $contact_portfolio: String
    $contact_countryCode: String
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
        contact_portfolio: $contact_portfolio
        contact_countryCode: $contact_countryCode
      }
    ) {
      affected_rows
    }
  }
`;
