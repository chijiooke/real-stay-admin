import { AxiosInstance } from "./httpConfig";

interface RefreshResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
  success: boolean;
}

export const setupInterceptors = () => {
  console.log("setting up interceptors...");

  // Request interceptor
  AxiosInstance.interceptors.request.use(
    async (config) => {
      try {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.error("Request interceptor error:", err);
      }
      return config;
    },
    (error) => {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  AxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Only handle 401 once
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem("refresh_token");
          const userId = localStorage.getItem("user_id");

          if (!refreshToken || !userId) throw new Error("No refresh token available");

          // Call refresh endpoint
          const { data } = await AxiosInstance.post<RefreshResponse>(
            "/auth/refresh",
            {
              user_id: userId,
              refresh_token: refreshToken,
            }
          );

          if (data.success) {
            // Save new tokens
            localStorage.setItem("token", data.data.access_token);
            localStorage.setItem("refresh_token", data.data.refresh_token);

            // Retry original request
            if (originalRequest.headers)
              originalRequest.headers.Authorization = `Bearer ${data.data.access_token}`;

            return AxiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          // Clear tokens and redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_id");
          window.location.href = "/";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
