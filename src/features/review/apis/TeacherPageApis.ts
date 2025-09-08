import api from "../../../utils";

export const getAllLecturerAPI = async (params: {
  page?: number;
  size?: number;
  sort?: string;
  campusId?: number;
  name?: string;
  code?: string;
} = {}) => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")
  );
  const response = await api.get(`/lecturers`, { params: queryParams });
  return response.data;
}

export const getAllCampusesAPI = async (params: {
  page?: number;
  size?: number;
  sort?: string;
} = {}) => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")
  );
  const response = await api.get(`/campuses`, { params: queryParams });
  return response.data;
};

export const getLecturerByIdAPI = async (id: number) => {
  const response = await api.get(`/lecturers/${id}`);
  return response.data;
};


interface ReviewParams {
  lecturerId?: number;
  courseId?: number;
  studentId?: number;
  semesterId?: number;
  isVerified?: boolean;
  isAnonymous?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

const cleanParams = (params: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")
  );

export const getReviewsAPI = async (params: ReviewParams = {}) => {
  const response = await api.get(`/reviews`, { params: cleanParams(params) });
  return response.data;
};


export const createLecturerAPI = async (data: {
  name: string;
  code: string;
  bio?: string;
  campusId: number;
}) => {
  const response = await api.post(`/lecturers`, data);
  return response.data;
};
