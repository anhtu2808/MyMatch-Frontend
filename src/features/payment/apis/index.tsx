import api from "../../../utils"; 

export const fetchQrCodeAPI = async () => {
    const response = await api.get("/payments/qr");
    return response.data
}