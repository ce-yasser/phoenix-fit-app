import axiosClient from "@interceptors/axiosClient";
import * as I from "@interfaces";
import { Endpoints } from "@constants/endpoints";

export const submitRegistration = async (
  fields: I.August2026Interface,
): Promise<I.CompetitionResponse> => {
  const formData = new FormData();
  formData.append("gender", fields.gender);
  formData.append("name", fields.name);
  formData.append("category", fields.category);
  formData.append("level", fields.level);
  formData.append("age", String(fields.age));
  formData.append("phone", fields.phone);

  const response = await axiosClient.post<{ data: I.CompetitionResponse }>(
    Endpoints.competition_august_2026,
    formData,
  );

  return response.data.data;
};

export const getCompetitionDetails = async (
  competitionId: string,
): Promise<I.CompetitionData> => {
  const response = await axiosClient.get<{ data: I.CompetitionData }>(
    `${Endpoints.competition}/${competitionId}`,
  );

  console.log('response', response);
  return response.data.data;
};

export const uploadCompetitionPayment = async (
  competitionId: string,
  file: File,
  onUploadProgress?: (percent: number) => void,
): Promise<I.CompetitionData> => {
  const formData = new FormData();
  formData.append("payment", file);

  const response = await axiosClient.post<{ data: I.CompetitionData }>(
    `${Endpoints.competition}/${competitionId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (!progressEvent.total) {
          return;
        }

        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );

        onUploadProgress?.(percent);
      },
    },
  );

  return response.data.data;
};

export const cancelCompetitionRegistration = async (
  competitionId: string,
): Promise<I.CompetitionData> => {
  const response = await axiosClient.put<{ data: I.CompetitionData }>(
    `${Endpoints.competition}/${competitionId}`,
    { status: "CANCELED" },
  );

  return response.data.data;
};
