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
  const queryParams: any = Object.fromEntries(
    Object.entries(params).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );

  if (!queryParams.filter) {
    queryParams.filter = "{}"; // stringify object rỗng
  } else if (typeof queryParams.filter === "object") {
    queryParams.filter = JSON.stringify(queryParams.filter);
  }

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

export const deleteMaterialAPI = async (id: number) => {
  const response = await api.delete(`/materials/${id}`);
  return response.data;
};

export interface MaterialDetailResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  owner?: {
    id: number;
    username: string;
    email?: string;
    avatarUrl?: string;
  };
  lecturer?: {
    id: number;
    name: string;
    code: string;
  };
  course?: {
    id: number;
    code: string;
    name: string;
  };
  totalDownloads: number;
  totalPurchases: number;
  createAt: string;
  updateAt: string;
  isPurchased: boolean;
  fileUrl?: string;
}

export const getMaterialByIdAPI = async (
  id: number
): Promise<MaterialDetailResponse> => {
  const response = await api.get(`/materials/${id}`);
  return response.data.result ?? response.data;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const createMaterialAPI = async (data: {
  name: string;
  description: string;
  courseId: number;
  lecturerId: number;
  file: File;
}) => {
  if (data.file.size > MAX_FILE_SIZE) {
    throw new Error("File vượt quá dung lượng tối đa 5MB");
  }
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("courseId", data.courseId.toString());
  formData.append("lecturerId", data.lecturerId.toString());
  formData.append("file", data.file);

  const response = await api.post("/materials", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const purchaseMaterialAPI = async (materialId: number) => {
  const response = await api.post(`/materials/${materialId}/purchase`);
  return response.data;
};

export const downloadMaterialAPI = async (materialId: number) => {
  const response = await api.get(`/materials/${materialId}/download`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `material-${materialId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();

  return response.data;
};

export const updateMaterialAPI = async (
  id: number,
  data: {
    name: string;
    description?: string;
    courseId: number;
    lecturerId: number;
  }
) => {
  const response = await api.put(`/materials/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
