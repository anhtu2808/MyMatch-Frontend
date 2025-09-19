import api from "../../../utils";

export const getProfileAPI = async () => {
  const response = await api.get(`/users/my-info`);
  return response.data;
};

export const updateUserAPI = async (id: number, data: any) => {
  const reponse = await api.put(`/users/${id}`, data);
  return reponse.data;
};

export const createImageAPI = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/reviews/upload-evidence`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
