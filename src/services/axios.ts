import axios from "axios";
import { toast } from "react-hot-toast";

import { apiHost } from "@/utils/host";
import { getAuthHeader } from "./auth-header";
import authService from "./auth-service";

axios.defaults.baseURL = apiHost;

const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getAuthHeader();
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      toast.error("Service not available!");
    }
    //  else if (error.response.status === 401) {
    // 	toast.error('Session has been expired, login again')
    // 	setTimeout(() => {
    // 		authService.logout()
    // 		window.location.href = "/login"
    // 	}, 1000)
    // }

    return Promise.reject(error);
  }
);

export const parseErrorResponse = (error: any) => {
  return (
    error.response?.data?.message ||
    error.response?.data?.errors ||
    error.response?.data?.error ||
    error.message ||
    error.toString()
  );
};

export default axiosInstance;
