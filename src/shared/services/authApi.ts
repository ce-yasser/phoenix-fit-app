import axiosClient from "@interceptors/axiosClient";
import { Endpoints } from "@constants/endpoints";
import * as I from "@interfaces";

export interface VerifyOtpResponse {
  accessToken: string;
  // add more fields if your BE returns user info, e.g. role, etc.
}

export const requestOtp = async (payload: I.RegisterPayload): Promise<void> => {
  const response = await axiosClient.post<I.RegisterResponse>(
    Endpoints.register,
    payload,
  );
  return response.data.data;
};

export const verifyOtp = async (
  payload: I.VerifyPayload,
): Promise<I.VerifyResponse> => {
  const response = await axiosClient.post<I.VerifyResponse>(
    Endpoints.verify,
    payload,
  );
  return response.data.data;
};
