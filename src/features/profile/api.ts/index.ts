import api from "../../../utils";

export const getProfileAPI = async () => {
  const response = await api.get(`/users/my-info`);
  return response.data;
};