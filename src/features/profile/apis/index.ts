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

  const response = await api.post(`/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getStudentIdAPI = async (id: number) => {
  const response = await api.get(`/students/${id}`)
  return response.data;
}

export const updateStudentAPI = async (id: number, data: any) => {
  const response = await api.put(`/students/${id}`, data)
  return response.data;
}