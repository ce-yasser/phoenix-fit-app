export interface RegisterPayload {
  email: string;
}

export interface RegisterResponse {
  message: "generated" | "duplicate";
  expiresAfter: number;
  isNewUser: boolean;
}

export interface VerifyPayload {
  email: string;
  otp: string;
}

export interface VerifyResponse {
  accessToken: string;
}