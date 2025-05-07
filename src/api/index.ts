import axios from "axios";

export const API_URL = import.meta.env.VITE_SERVER_URL;

// const api = axios.create({
//   withCredentials: true,
//   baseURL: API_URL,
// });

const host = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const authHost = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

authHost.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

authHost.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refreshToken,
        });
        console.log(response)
        const { access } = response.data;

        localStorage.setItem("accessToken", access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return authHost.request(originalRequest);
      } catch (e) {
        console.log("Not Auth");
      }
    }
    throw error;
  }
);

export { host, authHost };
