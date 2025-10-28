import api from "../../../utils";

export const getTransactionAPI = async (page: any, size: any) => {
  const response = await api.get(`/transactions/my-transactions?page=${page}&size=${size}`);
  return response.data;
};