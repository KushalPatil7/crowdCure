// src/api/axios.js
import axios from "axios";

// Create the base instance
const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1/", // backend base URL
  withCredentials: true,
});

// Add request interceptor to include token in headers when available
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for token refresh
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Get refresh token
        const refreshToken = localStorage.getItem("refreshToken");
        
        if (!refreshToken) {
          // No refresh token available, redirect to login
          window.location.href = "/auth";
          return Promise.reject(error);
        }
        
        // Create a basic axios instance for the refresh call to avoid infinite loop
        const refreshInstance = axios.create({
          baseURL: "http://localhost:8000/api/v1/",
          withCredentials: true,
        });
        
        // Call your token refresh endpoint
        const response = await refreshInstance.post("/auth/refresh", { refreshToken });
        const { accessToken } = response.data;
        
        // Save new token
        localStorage.setItem("accessToken", accessToken);
        
        // Add token to original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        // Retry original request
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default instance;
