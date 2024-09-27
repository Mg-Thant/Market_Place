import axios from "axios";

const refreshLocalStorage = () => {
  return localStorage.getItem("token");
};

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = refreshLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
