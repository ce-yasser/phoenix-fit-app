import axiosClient from "@interceptors/axiosClient";
import * as I from "@interfaces";
import { Endpoints } from "@constants/endpoints";

export const submitRegistration = async (
  fields: I.August2026DtoInterface,
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
): Promise<I.CompetitionResponse> => {
  const response = await axiosClient.get<{ data: I.CompetitionResponse }>(
    `${Endpoints.competition_august_2026}/${competitionId}`,
  );

  return response.data.data;
};
