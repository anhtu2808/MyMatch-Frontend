// // import { API_ROOT } from "../../../utils/constants";
// import api from "../../../utils/index"

import api from "../../../utils"

// export const loginAPI = async (authCode: string) => {
//   const response = await api.post(`/auth/outbound/authentication?code=${authCode}`);
//     return response.data;
// };

export const LoginGoogleAPI = async (authCode: string, redirectUri: string) => {
  const response = await api.post(`/auth/outbound/authentication?code=${authCode}&redirect_uri=${encodeURIComponent(redirectUri)}`,)
  return response.data
}