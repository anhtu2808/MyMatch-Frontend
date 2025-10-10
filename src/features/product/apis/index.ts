import api from "../../../utils"

export const getProductAPI = async () => {
    const response = await api.get("/plans");
    return response.data
}

export const createProductAPI = async (id: number) => {
    const response = await api.post("/user-purchases", id)
    return response.data
}