import axios from 'axios';
import { auth } from '@/lib/firebaseConfig';
import { toast } from '@/hooks/use-toast';

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create axios instance
export const axiosInstanceV3 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'Failed to authenticate request',
      });
      return Promise.reject(error);
    }
  },
  (error) => {
    toast({
      variant: 'destructive',
      title: 'Request Failed',
      description: 'Failed to send request',
    });
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
          const newToken = await user.getIdToken(true);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        toast({
          variant: 'destructive',
          title: 'Session Expired',
          description: 'Please login again to continue',
        });
        // You might want to trigger a logout or redirect to login here
        return Promise.reject(refreshError);
      }
    }

    // Handle specific error cases
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';

    switch (error.response?.status) {
      case 400:
        toast({
          variant: 'destructive',
          title: 'Invalid Request',
          description: errorMessage,
        });
        break;
      case 403:
        toast({
          variant: 'destructive',
          title: 'Access Denied',
          description: "You don't have permission to perform this action",
        });
        break;
      case 404:
        toast({
          variant: 'destructive',
          title: 'Not Found',
          description: 'The requested resource was not found',
        });
        break;
      case 429:
        toast({
          variant: 'destructive',
          title: 'Too Many Requests',
          description: 'Please try again later',
        });
        break;
      case 500:
        toast({
          variant: 'destructive',
          title: 'Server Error',
          description: 'An internal server error occurred',
        });
        break;
      default:
        toast({
          variant: 'destructive',
          title: 'Error',
          description: errorMessage,
        });
    }

    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.message || 'An error occurred',
      code: error.response?.data?.code || 'UNKNOWN_ERROR',
      data: error.response?.data,
    });
  },
);

// Request interceptor
axiosInstanceV3.interceptors.request.use(
  async (config) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'Failed to authenticate request',
      });
      return Promise.reject(error);
    }
  },
  (error) => {
    toast({
      variant: 'destructive',
      title: 'Request Failed',
      description: 'Failed to send request',
    });
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstanceV3.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const user = auth.currentUser;
        if (user) {
          const newToken = await user.getIdToken(true);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        toast({
          variant: 'destructive',
          title: 'Session Expired',
          description: 'Please login again to continue',
        });
        // You might want to trigger a logout or redirect to login here
        return Promise.reject(refreshError);
      }
    }

    // Handle specific error cases
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';

    switch (error.response?.status) {
      case 400:
        toast({
          variant: 'destructive',
          title: 'Invalid Request',
          description: errorMessage,
        });
        break;
      case 403:
        toast({
          variant: 'destructive',
          title: 'Access Denied',
          description: "You don't have permission to perform this action",
        });
        break;
      case 404:
        toast({
          variant: 'destructive',
          title: 'Not Found',
          description: 'The requested resource was not found',
        });
        break;
      case 429:
        toast({
          variant: 'destructive',
          title: 'Too Many Requests',
          description: 'Please try again later',
        });
        break;
      case 500:
        toast({
          variant: 'destructive',
          title: 'Server Error',
          description: 'An internal server error occurred',
        });
        break;
      default:
        toast({
          variant: 'destructive',
          title: 'Error',
          description: errorMessage,
        });
    }

    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.message || 'An error occurred',
      code: error.response?.data?.code || 'UNKNOWN_ERROR',
      data: error.response?.data,
    });
  },
);

// API function types
export type ApiError = {
  status: number;
  message: string;
  code: string;
  data?: any;
};

export type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
};

export default axiosInstance;
