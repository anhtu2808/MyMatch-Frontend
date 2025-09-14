import api from "../../../utils"

export const getProductAPI = async () => {
    const response = await api.get("/plans");
    return response.data
}