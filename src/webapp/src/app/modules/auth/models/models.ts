export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface MessageResponse {
  message: string;
}

export interface UserResponse {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
}
export interface User extends UserResponse {}
