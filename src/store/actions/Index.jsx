import axios from "axios";
let baseURL = import.meta.env.VITE_APP_BASE_URL;

export const register = async (userData) => {
  return await axios.post(`${baseURL}/user/register`, userData);
};
export const login = async (userData) => {
  return await axios.post(`${baseURL}/user/login`, userData);
};
export const logOut = async () => {
  return await axios.get(`${baseURL}/user/logout/`);
};
export const logOutFromAllDevices = async () => {
  return await axios.post(`${baseURL}/user/logout/all`);
};
