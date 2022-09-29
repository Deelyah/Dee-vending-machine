import axios from "axios";
let baseURL = import.meta.env.VITE_APP_BASE_URL;

export const login = async (userData) => {
  return await axios.post(`${baseURL}/user/register`, userData);
};
export const logOut = async () => {
  return await axios.post(`${baseURL}/auth/logout`);
};
