import { AxiosInstance } from "./httpConfig";

export const setupInterceptors = () => {

  console.log("setting up interceptors...")
  // Request interceptor
  AxiosInstance.interceptors.request.use(
    async (config) => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // config.headers["platform"] = "web";
        // config.headers["country"] = "NG";
      } catch (err) {
        console.error("Request interceptor error:", err);
      }

      return config;
    },
    (error) => {
      // Request error
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );

  AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );
};
