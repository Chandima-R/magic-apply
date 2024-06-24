import {gql} from "@apollo/client";

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
      }
    }
`

export const ADD_NEW_CONTACT = gql`
    mutation addNewContact($contact_city: String, $contact_country: String, $contact_email: String, $contact_linkedin: String, $contact_name: String, $contact_phone: String, $contact_state: String, $contact_website: String) {
      insert_contact(objects: {contact_city: $contact_city, contact_country: $contact_country, contact_email: $contact_email, contact_linkedin: $contact_linkedin, contact_name: $contact_name, contact_phone: $contact_phone, contact_state: $contact_state, contact_website: $contact_website}) {
        affected_rows
      }
    }
`

export const UPDATE_CONTACT = gql`
    mutation updateContact{
        update_contact(where: {id: {_eq: $_eq}}, _set: {contact_city: $contact_city1, contact_country: $contact_country1, contact_email: $contact_email1, contact_linkedin: $contact_linkedin1, contact_name: $contact_name1, contact_phone: $contact_phone1, contact_state: $contact_state1, contact_website: $contact_website1}) {
            affected_rows
      }
    }
`
