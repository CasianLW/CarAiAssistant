export interface UserData {
  email: string;
  emailVerified: boolean;
  userId: string;
  username: string;
  roles: string[];
  isBanned: boolean;
  isPremium: boolean;
}

export interface AuthState {
  userData: UserData | null;
  isAuthenticated: boolean;
  isGuest: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface DecodedToken {
  email: string;
  userId: string;
  username: string;
  roles: string[];
  isBanned: boolean;
  isPremium: boolean;
}

export interface User {
  username: string;
  userId: string;
  email: string;
  roles: string[];
  isBanned: boolean;
  isPremium: boolean;
}
