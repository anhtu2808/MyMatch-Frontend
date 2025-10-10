import api from "../../../utils"

//Member
export const getProfileId = async (id: number) => {
    const response = await api.get(`/student-requests/${id}`)
    return response.data
}

export const updateProfile = async (id: number, data: any) => {
    const response = await api.put(`/student-requests/${id}`, data)
    return response.data
}

export const deleteProfile = async (id: number) => {
    const response = await api.delete(`/student-requests/${id}`)
    return response.data
}

export const getProfileStudentId = async (id: number, page: number, size: number) => {
    const response = await api.get(`/student-requests?studentId=${id}&page=${page}&size=${size}`)
    return response.data
}

export const getProfile = async (page: number, size: number) => {
  const response = await api.get(`/student-requests?status=OPEN&page=${page}&size=${size}`);
  return response.data;
};

export const createProfile = async (data: any) => {
    const response = await api.post("/student-requests", data)
    return response.data
}

//Group
export const getGroupId = async (id: number) => {
    const response = await api.get(`/teams/${id}`)
    return response.data
}

export const updateGroup = async (id: number, data: any) => {
    const response = await api.put(`/teams/${id}`, data)
    return response.data
}

export const deleteGroup = async (id: number) => {
    const response = await api.delete(`/teams/${id}`)
    return response.data
}

export const getGroup = async (page: number, size: number) => {
    const response = await api.get(`/teams?page=${page}&size=${size}`)
    return response.data
}

export const getGroupStudentId = async (id: number, page: number, size: number) => {
    const response = await api.get(`/teams?page=${page}&size=${size}&studentId=${id}`)
    return response.data
}

export const createGroup = async (data: any) => {
    const response = await api.post("/teams", data)
    return response.data
}

//Skill
export const getSkillAPI = async () => {
    const response = await api.get("/skills")
    return response.data
}

//Course
export const getCourseAPI = async () => {
    const response = await api.get("/courses?universityId=1&page=1&size=10")
    return response.data
}