export interface SignupForm {
  email?: string;
  password?: string;

  firstName: string;
  mobile: string;
  path: string;
  otp: string;
}

export interface LoginForm {
  firstName?:string
   mobile?: string
   path?: string
   otp?: string; 
}

export interface AuthToken {
  authToken: string;
}

export interface LoggedUser {
  id: number;
  userId?: string;
  name: string;
  email: string;
  phone_number: string;
  role_id: number;
  authToken: string;
}

export interface AuthResponse {
  user: LoggedUser;
  token: AuthToken;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
}
