import api from "../../../utils";

export const getAllLecturerAPI = async (
  params: {
    page?: number;
    size?: number;
    sort?: string;
    campusId?: number;
    name?: string;
    code?: string;
    isReviewed?: boolean;
  } = {}
) => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );
  const response = await api.get(`/lecturers`, { params: queryParams });
  return response.data;
};

interface GetCoursesParams {
  universityId?: number;
  code?: string;
  name?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export const getCoursesAPI = async (params: GetCoursesParams = {}) => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );
  const response = await api.get(`/courses`, { params: queryParams });
  return response.data;
};

export interface GetMaterialsParams {
  name?: string;
  courseId?: number;
  lecturerId?: number;
  ownerId?: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: string;
}

export const getMaterialsAPI = async (params: GetMaterialsParams = {}) => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );

  const response = await api.get("/materials", { params: queryParams });
  return response.data.result;
};
