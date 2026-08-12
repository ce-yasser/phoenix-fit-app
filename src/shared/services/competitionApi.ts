import axiosClient from "@interceptors/axiosClient";
import * as I from "@interfaces";
import { Endpoints } from "@constants/endpoints";


export const submitRegistration = async (
  fields: I.August2026DtoInterface,
): Promise<void> => {
  const formData = new FormData();
  formData.append("gender", fields.gender);
  formData.append("name", fields.name);
  formData.append("category", fields.category);
  formData.append("level", fields.level);
  formData.append("age", String(fields.age));
  formData.append("phone", fields.phone);

  // return await axiosClient.post(Endpoints.competition_august_2026, formData);

  // catch axios error and return message from response
  try {
    return (await axiosClient.post(Endpoints.competition_august_2026, formData));
  } catch (error: any) {
    console.log('error', error);
    // if (error.response && error.response && error.response.message) {
    //   throw new Error(error.response.message);
    // } else {
    //   throw new Error("An unknown error occurred.");
    // }
  }
};
