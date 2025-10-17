// axiosConfig.js
import axios from "axios";
import { isTokenExpired } from "../utils/token";
import { refreshToken } from "./auth";

// ✅ Use environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: `${API_URL}/api/`,
});

// ✅ Attach interceptor
api.interceptors.request.use(
  async (config) => {
    // Skip login/refresh requests
    if (config.url.includes("token/")) return config;

    let token = localStorage.getItem("access_token");

    if (token && isTokenExpired(token)) {
      try {
        const data = await refreshToken();
        if (data?.access) {
          token = data.access;
          localStorage.setItem("access_token", token);
        } else {
          window.location.href = "/login";
          return Promise.reject("Token expired");
        }
      } catch {
        window.location.href = "/login";
        return Promise.reject("Token expired");
      }
    }

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;