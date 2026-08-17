import axiosClient from "@interceptors/axiosClient";
import { Endpoints } from "@constants/endpoints";
import type { ProgramsResponse } from "@interfaces";

export const getProgramsData = async (): Promise<ProgramsResponse> => {
  const response = await axiosClient.get<{ data: ProgramsResponse }>(
    Endpoints.programs,
  );
  return response.data.data;
};
