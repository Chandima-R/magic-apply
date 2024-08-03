export interface AddUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  email_verified?: Date | null;
  image?: string | null;
  hashedPassword?: string | null;
}
