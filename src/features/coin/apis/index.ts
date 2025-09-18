import api from "../../../utils"

export const getCoinAPI = async () => {
    const response = await api.get("/wallets/me");
    return response.data
}