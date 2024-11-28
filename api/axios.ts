import axios from "axios";
import { auth } from "@/lib/firebaseConfig";

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const user = auth.currentUser;
        if (user) {
          // Force token refresh
          const newToken = await user.getIdToken(true);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh error
        console.error("Token refresh failed:", refreshError);
      }
    }

    // Handle other errors
    const errorResponse = {
      status: error.response?.status,
      message: error.response?.data?.message || "An error occurred",
      code: error.response?.data?.code || "UNKNOWN_ERROR",
    };

    // You can add custom error handling here
    switch (error.response?.status) {
      case 400:
        errorResponse.message = "Bad Request";
        break;
      case 403:
        errorResponse.message = "Forbidden";
        break;
      case 404:
        errorResponse.message = "Resource Not Found";
        break;
      case 500:
        errorResponse.message = "Internal Server Error";
        break;
    }

    return Promise.reject(errorResponse);
  },
);
