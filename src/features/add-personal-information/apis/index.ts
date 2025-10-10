import api from "../../../utils";

export const getCampusesAPI = async (id: number) => {
  const response = await api.get(`/campuses?page=1&size=10&sort=id&universityId=${id}`);
  return response.data;
};

export const updateStudentAPI = async (data: any, id: number) => {
  const response = await api.put(`/students/${id}`, data);
  return response.data;
};
