import axios from "axios";
import { BASE_URL } from "../hooks/useFetch";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (refreshToken) {
          const response = await axios.post(`${BASE_URL}/auth/refresh`, {
            refresh: refreshToken,
          });
          const newAccessToken = response.data.access;
          localStorage.setItem(ACCESS_TOKEN, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
