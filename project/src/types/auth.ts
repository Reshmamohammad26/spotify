export interface AuthResponse {
  token: string;
  message?: string;
}

export interface AuthError {
  message: string;
}