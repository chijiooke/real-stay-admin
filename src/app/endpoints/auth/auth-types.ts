import { User } from "../user/user-types";

export interface ISignIn {
  email: string;
  password: string;
}

export interface AuthData {
  user: User;
  access_token: string;
}

export interface AuthResponse {
  data: AuthData;
  success: boolean;
}

export interface InviteAdminUserPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}
