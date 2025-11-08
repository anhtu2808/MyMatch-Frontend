import api from "../../../utils";

export const createSwapRequestAPI = async (data: any) => {
  const response = await api.post(`/swap-requests`, data);
  return response.data;
};

export const updateSwapRequestAPI = async (data: any, id: number) => {
  const response = await api.put(`/swap-requests/${id}`, data);
  return response.data;
};

export const deleteSwapRequestAPI = async (id: number) => {
  const response = await api.delete(`/swap-requests/${id}`)
  return response.data
}


export enum SwapStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export const getSwapMatchingAPI = async (params: {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
  requestFromId?: number;
  requestToId?: number;
  studentFromId?: number;
  studentToId?: number;
  anyStudentId?: number;
  mode?: "MANUAL" | "AUTOMATION";
  status?: "PENDING" | "APPROVED" | "REJECTED";
} = {}) => {
  // Lọc ra các param có giá trị (loại bỏ undefined, null, '')
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")
  );

  const response = await api.get(`/swaps`, { params: queryParams });
  return response.data;
};


export const getSwapRequestAPI = async (params: {
  page?: number;
  size?: number;
  sortBy?: string;
  studentId?: number;
  courseId?: number;
  lecturerFromId?: number;
  lecturerToId?: number;
  slotFrom?: string;
  slotTo?: string;
  visibility?: string;
  statuses?: string;
  fromClass?: string;
  targetClass?: string;
} = {}) => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")
  );

  const response = await api.get(`/swap-requests`, { params: queryParams });
  return response.data;
};

export const getLecturersAPI = async (id: number) => {
  const response = await api.get(`/lecturers/${id}`);
  return response.data;
};

export const getLecturerAPI = async (campusId: number, page: number, size: number) => {
    const response = await api.get(`/lecturers?campusId=${campusId}&page=${page}&size=${size}`)
    return response.data
}

export const getSwapRequestByIdAPI = async (id: number) => {
  const response = await api.get(`/swap-requests/${id}`);
  return response.data
}

export const updateConfirmSwapRequestAPI = async (data: any, id: number) => {
  const response = await api.patch(`/swaps/${id}/decision`, data);
  return response.data
}