export interface RequestOtpPayload {
  email: string;
}

export interface LoginResponse {
  message: "generated" | "duplicate";
  expiresAfter: number;
  isNewUser: boolean;
  otp?: string;
}

export interface VerifyPayload {
  email: string;
  otp: string;
}

export interface VerifyResponse {
  accessToken: string;
  isRegistered: boolean;
}

export interface RegisterPayload {
  name: string;
}
export interface RegisterResponse {
  success: boolean;
}