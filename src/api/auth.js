// api/auth.js
import api from "./axiosConfig"; // 👈 use the shared axios instance

// Login request
export const login = async (username, password) => {
  const response = await api.post("token/", { username, password });
  return response.data;
};

// Refresh token
export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return null;
  const response = await api.post("token/refresh/", { refresh });
  return response.data;
};
