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

export interface MaterialItem {
  id: number;
  fileURL: string;
  size: number;  
  originalFileName: string;
  fileType: string;
  downloadCont: number;
}

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
  items?: MaterialItem[];
}

export const getMaterialByIdAPI = async (
  id: number
): Promise<MaterialDetailResponse> => {
  const response = await api.get(`/materials/${id}`);
  return response.data.result ?? response.data;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const createMaterialAPI = async (
  name: string,
  description: string,
  courseId: number,
  lecturerId: number,
  materialItemIds: number[]
) => {
  // const payload = JSON.stringify(data); 
  // console.log(payload);
  const materialParams = materialItemIds.map(id => `materialItemIds=${id}`).join("&");

  const url = `/materials?name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}&courseId=${courseId}&lecturerId=${lecturerId}&${materialParams}`;

  const response = await api.post(url, null, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};






export const purchaseMaterialAPI = async (materialId: number) => {
  const response = await api.post(`/materials/${materialId}/purchase`);
  return response.data;
};


export const downloadMaterialAPI = async (materialId: number) => {
  const response = await api.get(`/material-items/${materialId}/download`, {
    responseType: "blob",
  });

  let filename = `material-${materialId}`;
  const disposition = response.headers["content-disposition"];

  if (disposition) {
    const filenameStarMatch = disposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
    if (filenameStarMatch && filenameStarMatch[1]) {
      filename = decodeURIComponent(filenameStarMatch[1]);
    } else {
      const filenameMatch = disposition.match(/filename="?([^"]+)"?/i);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
      }
    }
  }

  const url = window.URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);

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


export const uploadMaterialAPI = async (name: string, file: File) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);

  const response = await api.post("/material-items", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;  
};
