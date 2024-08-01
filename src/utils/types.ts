export interface AddUser {
  user_email: string;
  user_firstname: string;
  user_clerk_id: string;
  user_image_url: string;
  user_lastname: string;
}

export interface User {
  id: string;
  user_email: string;
  user_firstname: string;
  user_clerk_id: string;
  user_image_url: string;
  user_lastname: string;
}

export type UserClerkId = any;
