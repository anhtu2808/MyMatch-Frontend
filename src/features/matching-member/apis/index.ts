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

export const getProfile = async (id: number) => {
    const response = await api.get(`/student-requests?studentId=${id}&page=0&size=0`)
    return response.data
}

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

export const getGroup = async () => {
    const response = await api.get("/teams?page=0&size=0")
    return response.data
}

export const createGroup = async (data: any) => {
    const response = await api.post("/teams", data)
    return response.data
}