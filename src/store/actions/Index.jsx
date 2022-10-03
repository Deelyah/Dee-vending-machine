import axios from "axios";
let baseURL = import.meta.env.VITE_APP_BASE_URL;

export const register = async (userData) => {
  return await axios.post(`${baseURL}/user/register`, userData);
};
export const login = async (userData) => {
  return await axios.post(`${baseURL}/user/login`, userData);
};
export const getUserProfile = async (userToken) => {
  return await axios.get(`${baseURL}/user/info`, {
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${userToken}`,
    },
  });
};
export const updateUserProfile = async (data) => {
  return await axios.put(`${baseURL}/user/${data.userId}`, data.userDetails, {
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${data.userToken}`,
    },
  });
};
export const getAllUsers = async (userToken) => {
  return await axios.get(`${baseURL}/user/`, {
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${userToken}`,
    },
  });
};
export const logOut = async (userToken) => {
  return await axios.get(`${baseURL}/user/logout/`, {
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${userToken}`,
    },
  });
};
export const logOutFromAllDevices = async (username) => {
  return await axios.post(`${baseURL}/user/logout/all`, username);
};
export const deleteAccount = async (userData) => {
  return await axios.delete(`${baseURL}/user/${userData[0]}`, {
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${userData[1]}`,
    },
  });
};

// PRODUCTS

export const getSellersProducts = async (userToken) => {
  return await axios.post(`${baseURL}/product/seller`, "", {
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export const getProductById = async (product) => {
  return await axios.get(`${baseURL}/product/${product.id}`, {
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${product.token}`,
    },
  });
};

export const getAllProducts = async () => {
  return await axios.get(`${baseURL}/product`);
};

export const createProduct = async (product) => {
  return await axios.post(`${baseURL}/product`, product.details, {
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${product.token}`,
    },
  });
};

export const updateProduct = async (product) => {
  return await axios.put(`${baseURL}/product/${product.id}`, product.details, {
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${product.token}`,
    },
  });
};

export const buyAProduct = async (product) => {
  return await axios.post(
    `${baseURL}/product/buy/${product.id}`,
    { amount: product.amount },
    {
      headers: {
        "Content-Type": "Application/JSON",
        Authorization: `Bearer ${product.token}`,
      },
    }
  );
};

export const deleteProduct = async (product) => {
  return await axios.delete(`${baseURL}/product/${product.id}`, {
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${product.token}`,
    },
  });
};

// Funds
export const fundAccount = async (deposit) => {
  return await axios.put(
    `${baseURL}/user/`,
    { deposit: deposit.amount },
    {
      headers: {
        "Content-Type": "Application/JSON",
        Authorization: `Bearer ${deposit.token}`,
      },
    }
  );
};

export const resetAccountBalance = async (token) => {
  return await axios.post(`${baseURL}/user/reset`, "", {
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: `Bearer ${token}`,
    },
  });
};
